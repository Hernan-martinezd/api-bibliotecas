import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';

describe('BooksService', () => {
  let service: BooksService;
  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(BookEntity),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should return all books', async () => {
    mockRepo.find.mockResolvedValue([{ id: '1', title: 'Test Book' }]);
    const result = await service.findAll();
    expect(result).toEqual([{ id: '1', title: 'Test Book' }]);
  });

  it('should throw if publicationDate is in the future', async () => {
    const futureDate = new Date(Date.now() + 86400000); // mañana
    await expect(
      service.create({
        title: 'Future',
        author: 'Author',
        publicationDate: futureDate,
        isbn: '1234',
      }),
    ).rejects.toThrow('Publication date must be today or in the past');
  });
});
