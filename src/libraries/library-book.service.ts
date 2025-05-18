import { Test, TestingModule } from '@nestjs/testing';
import { LibraryBookService } from './library-book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LibraryEntity } from './entities/library.entity';
import { BookEntity } from 'src/books/entities/book.entity';

describe('LibraryBookService', () => {
  let service: LibraryBookService;
  const mockLibraryRepo = {
    findOne: jest.fn(),
    save: jest.fn(),
  };
  const mockBookRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibraryBookService,
        {
          provide: getRepositoryToken(LibraryEntity),
          useValue: mockLibraryRepo,
        },
        {
          provide: getRepositoryToken(BookEntity),
          useValue: mockBookRepo,
        },
      ],
    }).compile();

    service = module.get<LibraryBookService>(LibraryBookService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should add a book to a library', async () => {
    const book = { id: '2' };
    const library = { id: '1', books: [], save: jest.fn() };
    mockLibraryRepo.findOne.mockResolvedValue({ ...library, books: [] });
    mockBookRepo.findOne.mockResolvedValue(book);

    const result = await service.addBookToLibrary('1', '2');
    expect(mockLibraryRepo.save).toHaveBeenCalled();
    expect(result.books).toContain(book);
  });
});

