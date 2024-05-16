import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Donate } from './entities/donate.entity';
import { UsersService } from 'src/users/users.service';
import { BooksService } from 'src/books/books.service';
import { CreateDonateDto } from './dto/create-donate.dto';

@Injectable()
export class DonateService {
  constructor(
    private dataSource: DataSource,
    // private userService: UsersService,
    // private booksService: BooksService,
  ) {}

  async create({
    postDate,
    bookId,
    donateId,
    recieverId,
    shippingDate,
    receivedDate,
  }: CreateDonateDto) {
    const donate = new Donate();
    donate.postDate = postDate;
    donate.bookId = bookId;
    donate.donateId = donateId;
    donate.recieverId = recieverId;
    donate.shippingDate = shippingDate;
    donate.receivedDate = receivedDate;
    return this.dataSource.manager.save(donate);
  }

  async findAll() {
    return this.dataSource.manager.find(Donate);
  }

  async findOne(id: number) {
    const donate = await this.dataSource.manager.findOne(Donate, {
      where: {
        id: id,
      },
      // relations: {
      //   users: true,
      // },
    });
    if (donate) return donate;
    throw new NotFoundException('Donate not found');
  }
  // async donateToBook(
  //   userId: number,
  //   bookId: number,
  //   amount: number,
  // ): Promise<boolean> {
  //   const user = await this.userService.findOne(userId);
  //   const book = await this.booksService.findOne(bookId);

  // Assuming there is a relation between User and Donate entities
  //   const donate = new Donate();
  //   donate.amount = amount;
  //   donate.user = user;
  //   donate.book = book;

  //   const savedDonate = await this.dataSource.manager.save(Donate, donate);

  //   // Update the user's donatedBooks relation
  //   user.donatedBooks.push(savedDonate);
  //   await this.userService.update(userId, user);

  //   return true;
  // }

  // async findAllDonations(): Promise<Donate[]> {
  //   return this.dataSource.manager.find(Donate, {
  //     relations: ['user', 'book'],
  //   });
  // }

  // async findDonationsByUserId(userId: number): Promise<Donate[]> {
  //   const user = await this.userService.findOne(userId, {
  //     relations: ['donatedBooks'],
  //   });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   return user.donatedBooks;
  // }

  // async findDonationsByBookId(bookId: number): Promise<Donate[]> {
  //   const book = await this.booksService.findOne(bookId, {
  //     relations: ['donations'],
  //   });
  //   if (!book) {
  //     throw new NotFoundException('Book not found');
  //   }

  //   return book.donations;
  // }
}
