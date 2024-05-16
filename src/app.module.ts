import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { DonateService } from './donate/donate.service';
import { DonateModule } from './donate/donate.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'abcd',
      signOptions: {
        expiresIn: '2d', //2 days
      }
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'M7lyamar_',
      database: 'ourbooks',
      autoLoadEntities: true,
      synchronize: true,
    }), 
    UsersModule, BooksModule, AuthModule, DonateModule],
  providers: [DonateService],
  
})
export class AppModule {}
