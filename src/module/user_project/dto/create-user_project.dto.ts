import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/typeorm/entities/Project';
import { User } from 'src/typeorm/entities/User';
export class CreateUserProjectDto {
  role: string;
  @ApiProperty({
    example: 'Manager',
    enum: ['Manager', 'Member'],
    description: 'enum(Manager,Member)',
  })
  user: User;
  project: Project;
}
