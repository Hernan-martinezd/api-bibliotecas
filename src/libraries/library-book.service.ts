import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LibraryEntity } from './entities/library.entity';
import { BookEntity } from 'src/books/entities/book.entity';

@Injectable()
export class LibraryBookService {
  constructor(
    @InjectRepository(LibraryEntity)
    private readonly libraryRepository: Repository<LibraryEntity>,

    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async addBookToLibrary(libraryId: string, bookId: string): Promise<LibraryEntity> {
    const library = await this.getLibraryWithBooks(libraryId);
    const book = await this.getBook(bookId);

    if (library.books.find(b => b.id === book.id)) {
      return library; // ya está asociado
    }

    library.books.push(book);
    return this.libraryRepository.save(library);
  }

  async findBooksFromLibrary(libraryId: string): Promise<BookEntity[]> {
    const library = await this.getLibraryWithBooks(libraryId);
    return library.books;
  }

  async findBookFromLibrary(libraryId: string, bookId: string): Promise<BookEntity> {
    const library = await this.getLibraryWithBooks(libraryId);
    const book = library.books.find(book => book.id === bookId);
    if (!book) throw new NotFoundException(`Book ${bookId} not found in library`);
    return book;
  }

  async updateBooksFromLibrary(libraryId: string, bookIds: string[]): Promise<LibraryEntity> {
    const library = await this.getLibraryWithBooks(libraryId);

    const books: BookEntity[] = [];
    for (const bookId of bookIds) {
      const book = await this.getBook(bookId);
      books.push(book);
    }

    library.books = books;
    return this.libraryRepository.save(library);
  }

  async deleteBookFromLibrary(libraryId: string, bookId: string): Promise<void> {
    const library = await this.getLibraryWithBooks(libraryId);
    library.books = library.books.filter(book => book.id !== bookId);
    await this.libraryRepository.save(library);
  }

  private async getLibraryWithBooks(id: string): Promise<LibraryEntity> {
    const library = await this.libraryRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!library) throw new NotFoundException(`Library ${id} not found`);
    return library;
  }

  private async getBook(id: string): Promise<BookEntity> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Book ${id} not found`);
    return book;
  }
}
