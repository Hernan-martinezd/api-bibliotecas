import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LibraryEntity } from './entities/library.entity';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';

@Injectable()
export class LibrariesService {
  constructor(
    @InjectRepository(LibraryEntity)
    private readonly libraryRepository: Repository<LibraryEntity>,
  ) {}

  async findAll(): Promise<LibraryEntity[]> {
    return this.libraryRepository.find({ relations: ['books'] });
  }

  async findOne(id: string): Promise<LibraryEntity> {
    const library = await this.libraryRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!library)
      throw new NotFoundException(`Library with id ${id} not found`);
    return library;
  }

  async create(dto: CreateLibraryDto): Promise<LibraryEntity> {
    this.validateHours(dto.openHour, dto.closeHour);
    const library = this.libraryRepository.create(dto);
    return this.libraryRepository.save(library);
  }

  async update(id: string, dto: UpdateLibraryDto): Promise<LibraryEntity> {
    const library = await this.findOne(id);
    const openHour = dto.openHour ?? library.openHour;
    const closeHour = dto.closeHour ?? library.closeHour;
    this.validateHours(openHour, closeHour);

    Object.assign(library, dto);
    return this.libraryRepository.save(library);
  }

  async delete(id: string): Promise<void> {
    const result = await this.libraryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Library with id ${id} not found`);
    }
  }

  private validateHours(openHour: string, closeHour: string) {
    if (!/^\d{2}:\d{2}$/.test(openHour) || !/^\d{2}:\d{2}$/.test(closeHour)) {
      throw new BadRequestException('openHour and closeHour must be in HH:mm format');
    }

    const [openH, openM] = openHour.split(':').map(Number);
    const [closeH, closeM] = closeHour.split(':').map(Number);

    const open = new Date();
    open.setHours(openH, openM, 0);

    const close = new Date();
    close.setHours(closeH, closeM, 0);

    if (open >= close) {
      throw new BadRequestException('openHour must be earlier than closeHour');
    }
  }
}
