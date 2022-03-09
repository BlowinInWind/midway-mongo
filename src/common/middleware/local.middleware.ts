import { Middleware } from '@midwayjs/decorator';
import { PassportMiddleware } from '@midwayjs/passport';
import { AuthenticateOptions } from 'passport';
import { LocalStrategy } from '../strategies';

@Middleware()
export class LocalPassportMiddleware extends PassportMiddleware(LocalStrategy) {
  getAuthenticateOptions(): AuthenticateOptions | Promise<AuthenticateOptions> {
    return {
      failureRedirect: '/login',
    };
  }
}
