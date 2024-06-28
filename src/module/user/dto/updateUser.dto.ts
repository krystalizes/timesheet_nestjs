import { AuthDto } from './../../auth/dto/auth.dto';
import { PartialType } from '@nestjs/mapped-types';
export class updateUserDto extends PartialType(AuthDto) {}
