import { IsNumber } from 'class-validator';

export class TimesheetDto {
  @IsNumber({}, { each: true })
  timesheetIds: number[];
}
