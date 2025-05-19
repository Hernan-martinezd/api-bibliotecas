import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { BookEntity } from '../../books/entities/book.entity';

@Entity('library')
export class LibraryEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column()
  city!: string;

  @Column()
  openHour!: string;

  @Column()
  closeHour!: string;

  @ManyToMany(() => BookEntity, (book: BookEntity) => book.libraries, { cascade: true })
  @JoinTable()
  books!: BookEntity[];
}
