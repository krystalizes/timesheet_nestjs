import { ForbiddenException, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from '../types/jwtPayload.type';
import { JwtPayloadWithRt } from '../types/jwtPayloadWithRt.type';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: RtStrategy.extractJwtFromCookie,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  private static extractJwtFromCookie(req: Request): string | null {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['refresh_token'];
    }
    return token;
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
    const refreshToken = RtStrategy.extractJwtFromCookie(req);
    if (!refreshToken) {
      throw new ForbiddenException('Refresh token not found in cookie');
    }
    return {
      ...payload,
      refreshToken,
    };
  }
}
