import { PartialType } from '@nestjs/mapped-types';
import { CreateUserProjectDto } from './create-user_project.dto';

export class UpdateUserProjectDto extends PartialType(CreateUserProjectDto) {}
