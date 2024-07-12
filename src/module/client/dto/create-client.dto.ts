import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    example: 'Samsung',
  })
  name: string;
  @ApiProperty({
    example: 'SS',
  })
  code: string;
  @ApiProperty({
    example: 'Korea',
  })
  address: string;
  @ApiProperty({
    example: 'abc@gmail.com',
  })
  email: string;
  @ApiProperty({
    example: '0123456789',
  })
  phone: string;
}
