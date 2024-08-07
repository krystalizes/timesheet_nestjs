import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Res,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { Tokens } from './types/token.type';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async getTokens(
    userId: number,
    email: string,
    role: string,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
          role,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: 15,
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email,
          role,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  async signUp(dto: AuthDto) {
    const email = dto.email;
    const phone = dto.phone;
    const user = await this.userService.findOne({ email });
    if (user) throw new ConflictException('User existed');
    const user1 = await this.userService.findOneWPhone({ phone });
    if (user1) throw new ConflictException('Phone used');
    const hash = await argon.hash(dto.password);
    dto.password = hash;
    const newUser = await this.userService.createUser(dto);
    return newUser;
  }
  async updateRtHash(userId: number, rt: string) {
    const hashedRt = await argon.hash(rt);
    await this.userService.updateUser(userId, { hashedRt });
  }
  async signIn(dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const email = dto.email;
    const user = await this.userService.findOne({ email });
    if (!user) throw new ForbiddenException('Account not existed');
    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Wrong password');
    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);
    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
    });
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
    });
    return res.json(tokens);
  }
  async logOut(userid: number, @Res({ passthrough: true }) res: Response) {
    await this.userService.updateUser(userid, { hashedRt: null });
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.json('Logout successfully');
  }
  async refreshTokens(
    userid: number,
    rt: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.getUser(userid);
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');
    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email, user.role);
    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
    });
    return tokens.access_token;
  }
}
