import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tokens } from './types/token.type';
import { AuthDto } from './dto/auth.dto';
import { AtGuard, RtGuard } from './common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  signUp(@Body() signUpDto: AuthDto): Promise<Tokens> {
    return this.authService.signUp(signUpDto);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: AuthDto): Promise<Tokens> {
    return this.authService.signIn(signInDto);
  }
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logOut(@GetCurrentUserId() userId: number) {
    return this.authService.logOut(userId);
  }
  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
