import { Module } from '@nestjs/common';
import { DonateService } from './donate.service';
import { DonateController } from './donate.controller';
import { Donate } from './entities/donate.entity';
import { BooksModule } from 'src/books/books.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Donate]), UsersModule],
  providers: [DonateService, UsersService],
  controllers: [DonateController],
})
export class DonateModule {}
