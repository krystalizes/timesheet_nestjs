import { IsEnum, IsNotEmpty } from 'class-validator';
import { ProjectStatus } from 'src/module/auth/common/enum/project-status.enum';
export class FilterProjectDto {
  @IsNotEmpty()
  @IsEnum(ProjectStatus)
  status: string;
}
