import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Branch } from 'src/typeorm/entities/Branch';

export class AuthDto {
  username: string;
  branch: Branch;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Exclude()
  password: string;
  name: string;
  address: string;
  DoB: Date;
  leave_day: number;
  sex: string;
  phone: string;
  work_time: string;
  position: string;
  user_type: string;
  user_level: string;
  @Exclude()
  hash?: string;
  @Exclude()
  hashedRt?: string;
}
