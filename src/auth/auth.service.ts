import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor (
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, password: string){
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new BadRequestException('wrong email or password');
        }
        // validate password ตรวจสอบรหัสผ่าน
        const isMatched = await bcrypt.compare(password, user.password)
        if (isMatched) {
            const payload = { userId: user.id }
            return {
                'access_token': this.jwtService.sign(payload)
            }
        }
        throw new BadRequestException('wrong email or password');
        // throw new UnauthorizedException();
    }
}
