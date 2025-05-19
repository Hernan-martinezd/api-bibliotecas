import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LibrariesService } from './libraries.service';
import { LibrariesController } from './libraries.controller';
import { LibraryEntity } from './entities/library.entity';
import { BookEntity } from '../books/entities/book.entity';
import { LibraryBookService } from './library-book.service';
import { LibraryBookController } from './library-book.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LibraryEntity, BookEntity])],
  controllers: [LibrariesController, LibraryBookController],
  providers: [LibrariesService, LibraryBookService],
})
export class LibrariesModule {}
