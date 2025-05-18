import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsDateString()
  publicationDate: Date;

  @IsNotEmpty()
  @IsString()
  isbn: string;
}
