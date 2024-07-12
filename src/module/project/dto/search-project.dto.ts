import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class SearchProjectDto {
  @ApiProperty({
    example: 'abc',
  })
  @IsString()
  @IsNotEmpty()
  input: string;
}
