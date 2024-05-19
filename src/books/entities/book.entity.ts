import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  bookName: string;

  @ApiProperty()
  @Column()
  bookAuthor: string;

  @ApiProperty()
  @Column()
  bookCategory: string;

  @ApiProperty()
  @Column()
  bookCon: string;

  @ApiProperty()
  @Column()
  bookDesc: string;

  @ManyToOne(() => User, (user) => user.books)
  @JoinTable()
  user: User;
}
