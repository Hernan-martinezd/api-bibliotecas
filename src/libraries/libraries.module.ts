import { Module } from '@nestjs/common';
import { LibrariesService } from './libraries.service';
import { LibrariesController } from './libraries.controller';
import { LibrariesController } from './libraries.controller';
import { LibrariesService } from './libraries.service';

@Module({
  imports: [TypeOrmModule.forFeature([LibraryEntity, BookEntity])],
  controllers: [LibrariesController],
  providers: [LibrariesService, LibraryBookService],
})
export class LibrariesModule {}

