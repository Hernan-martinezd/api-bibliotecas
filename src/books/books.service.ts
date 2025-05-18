import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async findAll(): Promise<BookEntity[]> {
    return this.bookRepository.find({ relations: ['libraries'] });
  }

  async findOne(id: string): Promise<BookEntity> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['libraries'],
    });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }

  async create(dto: CreateBookDto): Promise<BookEntity> {
    this.validateDate(dto.publicationDate);
    const book = this.bookRepository.create(dto);
    return this.bookRepository.save(book);
  }

  async update(id: string, dto: UpdateBookDto): Promise<BookEntity> {
    const book = await this.findOne(id);
    const publicationDate = dto.publicationDate ?? book.publicationDate;
    this.validateDate(publicationDate);
    Object.assign(book, dto);
    return this.bookRepository.save(book);
  }

  async delete(id: string): Promise<void> {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Book with id ${id} not found`);
  }

  private validateDate(date: Date) {
    const now = new Date();
    const pubDate = new Date(date);

    if (pubDate > now) {
      throw new BadRequestException(
        'Publication date must be today or in the past',
      );
    }
  }
}
