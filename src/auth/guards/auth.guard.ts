import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private jwtService: JwtService,
        private userService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        // get token from request
        const token = this.extractToken(request)
        if (!token) {
            throw new UnauthorizedException()
        }
        // console.log(token)
        // verify
        try {
            const payload = await this.jwtService.verify(token)
            const { userId } = payload
            const user = await this.userService.findOne(userId)
            request['user'] = user; // for next handler
        } catch (error) {
            throw new UnauthorizedException()
        }
        return true;
    }

    private extractToken(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type == 'Bearer' ? token : undefined;
    }
}