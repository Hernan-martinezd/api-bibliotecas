import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibrariesModule } from './libraries/libraries.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [LibrariesModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
