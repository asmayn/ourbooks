import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { DonateToBook } from './dto/donate-to-book.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Books')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    // private dataSouce: DataSource,
    // private userService: UsersService
  ) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }

  @Post('donation')
  async donation(@Body() donateBody: DonateToBook) {
    const success = await this.booksService.donation(donateBody);
    if (success) {
      return {
        message: 'Donated successfully',
      };
    }
    throw new BadRequestException("Couldn't ....");
  }
}
