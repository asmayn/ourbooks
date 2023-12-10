import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  // private users: User[] = [];
  // private runningID: number = 1;

  //Service connect database => Promise
  constructor(
    private dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { firstname, lastname, email, phone} = createUserDto;
    const newUser = new User();
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.email = email;
    //newUser.password = password;
    newUser.phone = phone;
    //newUser.address = address;

    const saved = await this.dataSource.manager.save(newUser);
    return null;
  }

  async findAll(): Promise<User[]> {
    return this.dataSource.manager.find(User);
  }

  async findOne(id: number) {
    return this.dataSource.manager.findOneOrFail(User, {
      where: {
        id: id
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
