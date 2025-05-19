import {
  Controller,
  Param,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LibraryBookService } from './library-book.service';

@Controller({ path: 'libraries/:libraryId/books/:bookId', version: '1' })
export class LibraryBookController {
  constructor(private readonly service: LibraryBookService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async addBookToLibrary(
    @Param('libraryId') libraryId: string,
    @Param('bookId') bookId: string,
  ) {
    return this.service.addBookToLibrary(libraryId, bookId);
  }

@Delete()
@HttpCode(HttpStatus.NO_CONTENT)
async removeBookFromLibrary(
  @Param('libraryId') libraryId: string,
  @Param('bookId') bookId: string,
) {
    return this.service.deleteBookFromLibrary(libraryId, bookId);
    }
  }
