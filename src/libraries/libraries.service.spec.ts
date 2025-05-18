import { Test, TestingModule } from '@nestjs/testing';
import { LibrariesService } from './libraries.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LibraryEntity } from './entities/library.entity';
import { Repository } from 'typeorm';

describe('LibrariesService', () => {
  let service: LibrariesService;
  let repo: Repository<LibraryEntity>;

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
        LibrariesService,
        {
          provide: getRepositoryToken(LibraryEntity),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<LibrariesService>(LibrariesService);
    repo = module.get(getRepositoryToken(LibraryEntity));
  });

  afterEach(() => jest.clearAllMocks());

  it('should return all libraries', async () => {
    mockRepo.find.mockResolvedValue([{ id: '1', name: 'Main Library' }]);
    const result = await service.findAll();
    expect(result).toEqual([{ id: '1', name: 'Main Library' }]);
  });

  it('should throw if openHour >= closeHour on create', async () => {
    await expect(
      service.create({
        name: 'X',
        address: 'A',
        city: 'B',
        openHour: '18:00',
        closeHour: '08:00',
      }),
    ).rejects.toThrow('openHour must be earlier than closeHour');
  });
});
