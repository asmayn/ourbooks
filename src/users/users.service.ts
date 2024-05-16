import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SALT_ROUND } from 'src/auth/constands';
// import { SALT_ROUND } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  // private users: User[] = [];
  // private runningID: number = 1;

  //Service connect database => เรียกใช้งานจะกลายเป็น Promise คือ async
  constructor(private dataSource: DataSource) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { firstname, lastname, email, password, phone, address } =
      createUserDto;
    console.log('Creating');

    const user = await this.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('duplicate email');
    }

    const newUser = new User();
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.email = email;
    newUser.phone = phone;
    newUser.address = address;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    newUser.password = hashedPassword;

    const saved = await this.dataSource.manager.save(newUser);
    return saved;
  }

  async findAll(): Promise<User[]> {
    return this.dataSource.manager.find(User);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.dataSource.manager.findOne(User, {
      where: {
        id: id,
      },
      relations: {
        books: true,
      },
    });
    if (user) return user;
    throw new NotFoundException('User not found');
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.dataSource.manager.findOne(User, {
      where: {
        email: email,
      },
    });
    if (user) return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.firstname) {
      user.firstname = updateUserDto.firstname;
    }
    if (updateUserDto.lastname) {
      user.lastname = updateUserDto.lastname;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }
    if (updateUserDto.phone) {
      user.phone = updateUserDto.phone;
    }
    if (updateUserDto.address) {
      user.address = updateUserDto.address;
    }
    return this.dataSource.manager.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.dataSource.manager.remove(user);
  }
}
