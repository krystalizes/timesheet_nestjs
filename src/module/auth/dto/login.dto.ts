import { PickType } from '@nestjs/swagger';
import { AuthDto } from './../../auth/dto/auth.dto';
export class LoginDto extends PickType(AuthDto, [
  'email',
  'password',
] as const) {}
