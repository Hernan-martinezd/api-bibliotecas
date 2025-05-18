import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { BookEntity } from 'src/books/entities/book.entity';

@Entity('library')
export class LibraryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  openHour: string; // formato HH:MM

  @Column()
  closeHour: string;

  @ManyToMany(() => BookEntity, (book) => book.libraries, { cascade: true })
  @JoinTable()
  books: BookEntity[];
}
