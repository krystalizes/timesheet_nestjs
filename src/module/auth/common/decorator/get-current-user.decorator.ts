import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRt } from '../../types/jwtPayloadWithRt.type';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    const token = request.cookies['access_token'];
    const user = token ? (request.user as JwtPayloadWithRt) : null;
    return user ? user[data] : null;
  },
);
