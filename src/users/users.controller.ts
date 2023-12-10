import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserResponse } from './dto/user-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
    ) {}

  @Post() // Post /users
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get() // Get /users
  async findAll(): Promise<UserResponse> {
    const users = await this.usersService.findAll();
    //format
    return {
      total: users.length,
      data: users
    }
  }

  @Post('register')
  register() {}

  @Get(':id') // Get /users/id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id') // put /users/id
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id') // delete /users/id
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
