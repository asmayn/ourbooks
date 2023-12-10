import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
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
    UsersModule, BooksModule],
  
})
export class AppModule {}
