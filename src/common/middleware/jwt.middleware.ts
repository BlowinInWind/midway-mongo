import { Middleware } from '@midwayjs/decorator';
import { PassportMiddleware } from '@midwayjs/passport';
import { AuthenticateOptions } from 'passport';
import { JwtStrategy } from '../strategies';

@Middleware()
export class JwtMiddleware extends PassportMiddleware(JwtStrategy) {
  getAuthenticateOptions(): AuthenticateOptions | Promise<AuthenticateOptions> {
    return {};
  }
}
