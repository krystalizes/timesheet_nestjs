import { PartialType } from '@nestjs/mapped-types';
import { createUserDto } from './createUser.dto';
export class updateUserDto extends PartialType(createUserDto) {}
