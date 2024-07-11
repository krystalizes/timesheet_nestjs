import { ProjectStatus } from 'src/module/auth/common/enum/project-status.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskType } from 'src/module/auth/common/enum/task-type.enum';
import { Project } from 'src/typeorm/entities/Project';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'task_test',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: '2024-06-24',
  })
  @IsString()
  start_date: Date;
  @ApiProperty({
    example: '2024-06-26',
  })
  @IsString()
  end_date: Date;
  @ApiProperty({
    example: 'description',
  })
  @IsString()
  description: string;
  @ApiProperty({
    example: TaskType.Other_Tasks,
    enum: TaskType,
  })
  @IsNotEmpty()
  @IsEnum(TaskType)
  type: string;
  @ApiProperty({
    example: ProjectStatus.Active,
    enum: ProjectStatus,
  })
  @IsNotEmpty()
  @IsEnum(ProjectStatus)
  status: string;
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  project: Project;
}
