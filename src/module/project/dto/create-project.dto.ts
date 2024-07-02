import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProjectType } from 'src/module/auth/common/enum/project-type.enum';
import { Client } from 'src/typeorm/entities/Client';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  start_date: Date;
  @IsString()
  @IsNotEmpty()
  end_date: Date;
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsEnum(ProjectType)
  type: string;
  @IsNotEmpty()
  client: Client;
  user_id: number[];
  role: string[];
}
