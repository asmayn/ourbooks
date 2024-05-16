import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Donate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'date' })
  postDate: String;

  @ApiProperty()
  @Column()
  bookId: number;

  @ApiProperty()
  // @PrimaryGeneratedColumn()
  @Column()
  donateId: number;

  @ApiProperty()
  // @PrimaryGeneratedColumn()
  @Column()
  recieverId: number;

  @ApiProperty()
  @Column({ type: 'date' })
  shippingDate: String;

  @ApiProperty()
  @Column({ type: 'date' })
  receivedDate: String;

  @ManyToMany(() => Book, (book) => book.users)
  @JoinTable()
  users: User[];
}
