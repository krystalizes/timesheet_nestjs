import { ProjectStatus } from 'src/module/auth/common/enum/project-status.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskType } from 'src/module/auth/common/enum/task-type.enum';
import { Project } from 'src/typeorm/entities/Project';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  start_date: Date;
  @IsString()
  end_date: Date;
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsEnum(TaskType)
  type: string;
  @IsNotEmpty()
  @IsEnum(ProjectStatus)
  status: string;
  @IsNotEmpty()
  project: Project;
}
