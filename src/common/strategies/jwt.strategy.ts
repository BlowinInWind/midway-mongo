import { Inject, Config } from '@midwayjs/decorator';
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../../service/user.service';
import { ApiException } from '../exceptions';

@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  @Inject()
  userService: UserService;

  @Config('jwt')
  jwtConfig;

  async validate(payload) {
    return payload;
  }

  // Strategy默认验证的是username和password，如果不一样需要自己重设
  // 当前策略的参数
  getStrategyOptions() {
    return {
      secretOrKey: this.jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
  }
}
