import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/user-response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActionResponseDto } from './dto/action-response.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard, AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // Get /users
  async findAll() // @Query() query: GetUserQuery
  : Promise<UserResponse> {
    const users = await this.usersService.findAll();
    //format
    return {
      total: users.length,
      data: users,
    };
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
    };
  }
}
