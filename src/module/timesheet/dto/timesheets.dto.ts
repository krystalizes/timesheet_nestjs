import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class TimesheetDto {
  @ApiProperty({
    example: [1, 2, 3],
  })
  @IsNumber({}, { each: true })
  timesheetIds: number[];
}
