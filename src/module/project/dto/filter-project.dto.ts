import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ProjectStatus } from 'src/module/auth/common/enum/project-status.enum';
export class FilterProjectDto {
  @ApiProperty({
    example: ProjectStatus.Active,
    enum: ProjectStatus,
  })
  @IsNotEmpty()
  @IsEnum(ProjectStatus)
  status: string;
}
