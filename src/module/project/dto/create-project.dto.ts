import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProjectType } from 'src/module/auth/common/enum/project-type.enum';
import { Client } from 'src/typeorm/entities/Client';
import { RoleUser } from '../../auth/common/enum/role-user.enum';

export class CreateProjectDto {
  @ApiProperty({
    example: 'project_test',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: '2024-06-24',
  })
  @IsString()
  @IsNotEmpty()
  start_date: Date;
  @ApiProperty({
    example: '2024-06-26',
  })
  @IsString()
  @IsNotEmpty()
  end_date: Date;
  @ApiProperty({
    example: 'description',
  })
  @IsString()
  description: string;
  @ApiProperty({
    example: ProjectType.Training,
    enum: ProjectType,
  })
  @IsNotEmpty()
  @IsEnum(ProjectType)
  type: string;
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  client: Client;
  @ApiProperty({
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsNumber({}, { each: true })
  user_id: number[];
  @ApiProperty({
    example: ['Manager', 'Member', 'Member'],
  })
  @IsOptional()
  @IsEnum(RoleUser, { each: true })
  role: string[];
}
