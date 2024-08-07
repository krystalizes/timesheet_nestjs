import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RtGuard } from './common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorator';
import { Roles } from './common/decorator/get-role-user.decorator';
import { Role } from './common/enum/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  @Post('create')
  signUp(@Body() signUpDto: AuthDto) {
    return this.authService.signUp(signUpDto);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto, @Res() res: Response) {
    return this.authService.signIn(signInDto, res);
  }
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logOut(@GetCurrentUserId() userId: number, @Res() res: Response) {
    return this.authService.logOut(userId, res);
  }
  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(
    @Res() res: Response,
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken, res);
  }
}
