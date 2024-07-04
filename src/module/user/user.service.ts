import { User } from '../../typeorm/entities/User';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { updateUserDto } from './dto/updateUser.dto';
import { AuthDto } from '../auth/dto/auth.dto';
import { EmailUserDto } from './dto/email-user.dto';

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
  async getUser(id: number, includePassword?: boolean) {
    const user = await this.UserRepository.findOne({
      where: { id },
      relations: ['branch'],
    });
    if (!includePassword) {
      delete user.password;
    }
    return user;
  }
  async findOne(emailUserDto: EmailUserDto) {
    const { email } = emailUserDto;
    return this.UserRepository.findOne({
      where: { email },
      relations: ['branch'],
    });
  }
  // tạo user
  createUser(createUserDto: AuthDto) {
    return this.UserRepository.save(createUserDto);
  }
  // update user
  async updateUser(id: number, updateUserDto: updateUserDto) {
    const user = await this.getUser(id);
    const updatedUser = await this.UserRepository.save(
      Object.assign(user, updateUserDto),
    );
    return updatedUser;
  }
}
