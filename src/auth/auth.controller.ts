import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';
import { ActionResponseDto } from 'src/users/dto/action-response.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';


@ApiTags('Auth')
@Controller()
export class AuthController {

    constructor (
        private authService: AuthService,
        private usersService: UsersService,
    ) {}

    @Post('register') // Post /register
    @ApiResponse({ status: 201, type: ActionResponseDto})
    async create(@Body() createUserDto: CreateUserDto): Promise<ActionResponseDto> {
      const user = await this.usersService.create(createUserDto);
      return {
        message: 'register successfully',
        user: user,
      }
    }

    @Post('login')
    async login(@Body() body: SignInDto) {
        return this.authService.signIn(body.email, body.password)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('me')
    async getMe(@Request() request) {
        return request.user; // me
    }

    
}
