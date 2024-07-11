import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { TimesheetStatus } from 'src/module/auth/common/enum/timesheet-status.enum';
import { TimesheetWorkType } from 'src/module/auth/common/enum/timesheet-work-type.enum';
import { Task } from 'src/typeorm/entities/Task';
import { User_project } from 'src/typeorm/entities/User_project';

export class CreateTimesheetDto {
  @ApiProperty({
    example: 'note',
  })
  @IsString()
  note: string;
  @ApiProperty({
    example: '2024-07-02',
  })
  @IsString()
  @IsNotEmpty()
  day: Date;
  @ApiProperty({
    example: 8,
  })
  @IsInt()
  @IsNotEmpty()
  work_time: number;
  @ApiProperty({
    example: TimesheetWorkType.Normal_Working_Hours,
    enum: TimesheetWorkType,
  })
  @IsEnum(TimesheetWorkType)
  @IsNotEmpty()
  work_type: string;
  @ApiProperty({
    example: TimesheetStatus.New,
    enum: TimesheetStatus,
  })
  @IsEnum(TimesheetStatus)
  @IsNotEmpty()
  status: string;
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  user_project: User_project;
  @ApiProperty({
    example: 2,
  })
  @IsNotEmpty()
  task: Task;
}
