import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../types/jwtPayload.type';
import { Request } from 'express';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: AtStrategy.extractJwtFromCookie,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private static extractJwtFromCookie(req: Request): string | null {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['access_token'];
    }
    return token;
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
