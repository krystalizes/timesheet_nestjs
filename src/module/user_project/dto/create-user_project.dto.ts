import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserPrjRole } from 'src/module/auth/common/enum/user-project-role.enum';
import { Project } from 'src/typeorm/entities/Project';
import { User } from 'src/typeorm/entities/User';
export class CreateUserProjectDto {
  @ApiProperty({
    example: 'Manager',
    enum: ['Manager', 'Member'],
    description: 'enum(Manager,Member)',
  })
  @IsEnum(UserPrjRole)
  @IsNotEmpty()
  role: string;
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  user: User;
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  project: Project;
}
