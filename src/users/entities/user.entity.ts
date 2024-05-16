import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ignoreElements } from 'rxjs';
import { Book } from 'src/books/entities/book.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  firstname: string;

  @ApiProperty()
  @Column()
  lastname: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Exclude()
  @Column({
    type: 'text',
  })
  password: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column({
    default: false,
  })
  isAdmin: boolean;

  @ApiPropertyOptional({
    type: [Book],
  })
  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
