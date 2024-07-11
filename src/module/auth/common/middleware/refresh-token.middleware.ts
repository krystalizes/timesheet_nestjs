import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../../auth.service';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'];

    if (!accessToken) {
      return next();
    }

    try {
      jwt.verify(accessToken, process.env.JWT_SECRET);
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const refreshToken = req.cookies['refresh_token'];
        if (!refreshToken) {
          res.clearCookie('access_token');
          throw new ForbiddenException(
            'No refresh token found, proceed to logout',
          );
        }
        const userId = (jwt.decode(refreshToken) as { id: number }).id;
        const newAccessToken = await this.authService.refreshTokens(
          userId,
          refreshToken,
          res,
        );
        req.cookies['access_token'] = newAccessToken;
        next();
      } else {
        next();
      }
    }
  }
}
