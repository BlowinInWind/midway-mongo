import { Config, Inject, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';

@Provide()
@Scope(ScopeEnum.Singleton)
export class Utils {
  @Config('jwt')
  jwtConfig;

  @Inject()
  jwt: JwtService;

  async jwtSign(sign: any, options?: any): Promise<string> {
    return await this.jwt.sign(sign, this.jwtConfig.secret, options);
  }

  jwtVerify(token: string, options?: any): any {
    return this.jwt.verify(token, this.jwtConfig.secret, options);
  }
}
