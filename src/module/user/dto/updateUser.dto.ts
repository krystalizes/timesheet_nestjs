import { AuthDto } from './../../auth/dto/auth.dto';
import { PartialType } from '@nestjs/swagger';
export class updateUserDto extends PartialType(AuthDto) {}
