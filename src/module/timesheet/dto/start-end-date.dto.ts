import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class StartEndDateDto {
  @ApiProperty({
    example: '2024-07-01',
  })
  @IsDateString()
  start_date: Date;
  @ApiProperty({
    example: '2024-07-07',
  })
  @IsDateString()
  end_date: Date;
}
