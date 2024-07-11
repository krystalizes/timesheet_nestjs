import { PartialType } from '@nestjs/mapped-types';
import { CreateUserProjectDto } from './create-user_project.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProjectDto extends PartialType(CreateUserProjectDto) {
  @ApiProperty({
    example: 'Manager',
    enum: ['Manager', 'Member'],
    description: 'enum(Manager,Member)',
  })
  role?: string;
}
