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
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example: 'john',
  })
  @IsString()
  username: string;
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  branch: Branch;
  @ApiProperty({
    example: 'abc@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    example: 'Asdf123!',
  })
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
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: '12 Pham Hung.St',
  })
  @IsString()
  address: string;
  @ApiProperty({
    example: '1990-01-01',
  })
  @IsString()
  DoB: Date;
  @ApiProperty({
    example: '2',
  })
  @IsInt()
  @Min(0)
  leave_day: number;
  @ApiProperty({
    example: UserSex.Male,
    enum: UserSex,
  })
  @IsEnum(UserSex)
  @IsNotEmpty()
  sex: string;
  @ApiProperty({
    example: '0123456789',
    description: '10-11 digit',
  })
  @IsNotEmpty()
  @Matches(/^\d{10,11}$/, { message: 'Phone number must have 10 or 11 digit' })
  phone: string;
  @Exclude()
  image: string;
  @ApiProperty({
    example: '09:00-18:00',
  })
  @IsString()
  work_time: string;
  @ApiProperty({
    example: RoleUser.Dev,
    enum: RoleUser,
  })
  @IsNotEmpty()
  @IsEnum(RoleUser)
  role: string;
  @ApiProperty({
    example: UserType.Intern,
    enum: UserType,
  })
  @IsNotEmpty()
  @IsEnum(UserType)
  user_type: string;
  @ApiProperty({
    example: UserLevel.Intern_1,
    enum: UserLevel,
  })
  @IsNotEmpty()
  @IsEnum(UserLevel)
  user_level: string;
  @Exclude()
  hashedRt: string;
}
