import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { LibraryEntity } from 'src/libraries/entities/library.entity';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publicationDate: Date;

  @Column()
  isbn: string;

  @ManyToMany(() => LibraryEntity, (library) => library.books)
  libraries: LibraryEntity[];
}
