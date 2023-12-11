import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserResponse } from './dto/user-response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActionResponseDto } from './dto/action-response.dto';
import { query } from 'express';
import { GetUserQuery } from './dto/get-user-query.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
    ) {}

  @Post() // Post /users
  @ApiResponse({ status: 201, type: ActionResponseDto})
  async create(@Body() createUserDto: CreateUserDto): Promise<ActionResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return {
      message: 'register successfully',
      user: user,
    }
  }

  @Get() // Get /users
  async findAll(
    // @Query() query: GetUserQuery
    ): Promise<UserResponse> {
    const users = await this.usersService.findAll();
    //format
    return {
      total: users.length,
      data: users
    }
  }

  // @Post('register')
  // register() {}

  @Get(':id') // Get /users/id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id') // put /users/id
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id') // delete /users/id
  async remove(@Param('id') id: string): Promise<ActionResponseDto> {
    const user = await this.usersService.remove(+id);
    return {
      message: 'Delete user ' + id + ' successfully',
      user: user,
    }
  }
}
