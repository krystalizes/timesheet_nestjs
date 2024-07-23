import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class PhoneUserDto {
  @ApiProperty({
    example: '0123456789',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
