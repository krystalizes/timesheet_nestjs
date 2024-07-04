import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { Branch } from 'src/typeorm/entities/Branch';
import { RoleUser } from '../common/enum/role-user.enum';
import { UserSex } from '../common/enum/user-sex.enum';
import { UserType } from '../common/enum/uesr-type.enum';
import { UserLevel } from '../common/enum/user-level.enum';

export class AuthDto {
  @IsString()
  username: string;
  @IsNotEmpty()
  branch: Branch;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long and contain an uppercase letter, a number, and a special character.',
    },
  )
  password: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  address: string;
  @IsString()
  DoB: Date;
  @IsInt()
  @Min(0)
  leave_day: number;
  @IsEnum(UserSex)
  @IsNotEmpty()
  sex: string;
  @IsNotEmpty()
  @Matches(/^\d{10,11}$/, { message: 'Phone number must have 10 or 11 digit' })
  phone: string;
  @Exclude()
  image: string;
  @IsString()
  work_time: string;
  @IsNotEmpty()
  @IsEnum(RoleUser)
  role: string;
  @IsNotEmpty()
  @IsEnum(UserType)
  user_type: string;
  @IsNotEmpty()
  @IsEnum(UserLevel)
  user_level: string;
  @Exclude()
  hashedRt: string;
}
