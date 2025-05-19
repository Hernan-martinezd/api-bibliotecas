import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LibrariesModule } from './libraries/libraries.module';
import { BooksModule } from './books/books.module';
import { LibraryEntity } from './libraries/entities/library.entity';
import { BookEntity } from './books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', 
      database: 'library.db',
      entities: [LibraryEntity, BookEntity],
      synchronize: true, // solo para desarrollo
    }),
    LibrariesModule,
    BooksModule,
  ],
})
export class AppModule {}
