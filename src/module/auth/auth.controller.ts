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
import { updateUserDto } from '../user/dto/updateUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  @Post('create')
  signUp(@Body() signUpDto: AuthDto, @Res() res: Response) {
    return this.authService.signUp(signUpDto, res);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: updateUserDto, @Res() res: Response) {
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
