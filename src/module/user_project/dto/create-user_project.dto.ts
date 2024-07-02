import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserPrjRole } from 'src/module/auth/common/enum/user-project-role.enum';
import { Project } from 'src/typeorm/entities/Project';
import { User } from 'src/typeorm/entities/User';
export class CreateUserProjectDto {
  @IsEnum(UserPrjRole)
  @IsNotEmpty()
  role: string;
  @ApiProperty({
    example: 'Manager',
    enum: ['Manager', 'Member'],
    description: 'enum(Manager,Member)',
  })
  @IsNotEmpty()
  user: User;
  @IsNotEmpty()
  project: Project;
}
