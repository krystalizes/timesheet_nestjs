import { CloudflareService } from './../cloudflare/cloudflare.service';
import { User } from '../../typeorm/entities/User';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { updateUserDto } from './dto/updateUser.dto';
import { AuthDto } from '../auth/dto/auth.dto';
import { EmailUserDto } from './dto/email-user.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { PhoneUserDto } from './dto/phone-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
    private cloudflareService: CloudflareService,
  ) {}
  async getAllUserPaginate(
    options: IPaginationOptions,
  ): Promise<Pagination<User>> {
    return paginate<User>(this.UserRepository, options, {
      relations: ['branch'],
    });
  }
  getAllUser() {
    return this.UserRepository.find();
  }
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
  async findOneWPhone(phoneDto: PhoneUserDto) {
    const { phone } = phoneDto;
    return this.UserRepository.findOne({
      where: { phone },
      relations: ['branch'],
    });
  }
  createUser(createUserDto: AuthDto) {
    return this.UserRepository.save(createUserDto);
  }
  async updateUser(id: number, updateUserDto: updateUserDto) {
    const user = await this.getUser(id);
    const updatedUser = await this.UserRepository.save(
      Object.assign(user, updateUserDto),
    );
    return updatedUser;
  }
  async addImg(file: Express.Multer.File, id: number) {
    const user = await this.getUser(id);
    const key = `${file.originalname}${Date.now()}`;
    if (user.image) {
      const imageKey = user.image.split('/').pop();
      await this.cloudflareService.deleteFile(imageKey);
    }
    const image = await this.cloudflareService.uploadFile(file, key);
    return await this.updateUser(id, { image });
  }
}
