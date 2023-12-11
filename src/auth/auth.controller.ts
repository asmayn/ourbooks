import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor (
        private authService: AuthService,
    ) {}

    @Post()
    async login(@Body() body: SignInDto) {
        return this.authService.signIn(body.email, body.password)
    }

    // @UseGuards(AuthGuard)
    // @ApiBearerAuth()
    // @Get('me')
    // async getMe(@Request() request) {
    //     return request.user; // me
    // }
}
