import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';
import { DonateToBook } from './dto/donate-to-book.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BooksService {
  constructor(
    private dataSouce: DataSource,
    private userService: UsersService,
  ) {}

  async create({ userId, bookName, bookAuthor, bookCategory, title, description }: CreateBookDto) {
    const book = new Book();
    const user = this.userService.findOne(userId)
    book.user = await user;
    book.bookName = bookName;
    book.bookAuthor = bookAuthor;
    book.bookCategory = bookCategory;
    book.title = title;
    book.description = description;
    return this.dataSouce.manager.save(book);
  }

  async findAll() {
    return this.dataSouce.manager.find(Book);
  }

  async findOne(id: number) {
    const book = await this.dataSouce.manager.findOne(Book, {
      where: {
        id: id,
      },
    });
    if (book) return book;
    throw new NotFoundException('Book not found');
  }

  async update(id: number, { bookName, bookAuthor, bookCategory, title, description }: UpdateBookDto) {
    const book = await this.findOne(id);
    book.bookName = bookName;
    book.bookAuthor = bookAuthor;
    book.bookCategory = bookCategory;
    book.title = title;
    book.description = description;
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    return this.dataSouce.manager.remove(book);
  }

  // async donation({ userId, bookId }: DonateToBook) {
  //   //find a user by id
  //   const user = await this.userService.findOne(userId);
  //   const book = await this.findOne(bookId);

  //   user.book.push(book);
  //   const result = await this.dataSouce.manager.save(user);
  //   return true;
  // }
}
