import { User } from '../../typeorm/entities/User';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from 'src/module/user/dto/createUser.dto';
import { Repository } from 'typeorm';
import { updateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}
  // get mọi user
  getAllUser() {
    return this.UserRepository.find({ relations: ['branch'] });
  }
  // get 1 user
  getUser(id: number) {
    return this.UserRepository.findOne({
      where: { id },
      relations: ['branch'],
    });
  }
  // tạo user
  createUser(createUserDto: createUserDto) {
    return this.UserRepository.save(createUserDto);
  }
  // update user
  async updateUser(id: number, updateUserDto: updateUserDto) {
    await this.UserRepository.update(id, updateUserDto);
    return this.UserRepository.findOneByOrFail({ id });
  }
}
