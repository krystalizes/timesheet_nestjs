import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { TimesheetStatus } from 'src/module/auth/common/enum/timesheet-status.enum';
import { TimesheetWorkType } from 'src/module/auth/common/enum/timesheet-work-type.enum';
import { Task } from 'src/typeorm/entities/Task';
import { User_project } from 'src/typeorm/entities/User_project';

export class CreateTimesheetDto {
  @IsString()
  note: string;
  @IsString()
  @IsNotEmpty()
  day: Date;
  @IsInt()
  @IsNotEmpty()
  work_time: number;
  @IsEnum(TimesheetWorkType)
  @IsNotEmpty()
  work_type: string;
  @IsEnum(TimesheetStatus)
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  user_project: User_project;
  @IsNotEmpty()
  task: Task;
}
