import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule
  ], //Userservice
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
