import { Inject } from '@midwayjs/decorator';
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../../service/user.service';
import { ApiException } from '../exceptions';

@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @Inject()
  userService: UserService;

  async validate(username, passwd) {
    const user = await this.userService.findUserByNameAndPasswd(
      username,
      passwd
    );

    if (!user) {
      throw new ApiException('请求参数错误');
    }

    return user;
  }

  // Strategy默认验证的是username和password，如果不一样需要自己重设
  // 当前策略的参数
  getStrategyOptions() {
    return {
      usernameField: 'username',
      passwordField: 'passwd',
    };
  }

  // serializeUser(user, done) {
  //   // 可以只保存用户id
  //   user && done(null, user.username);
  // }

  // async deserializeUser(id, done) {
  //   // 这里不是异步方法，你可以从其他地方根据用户名，反查用户数据。
  //   done(null, id);
  // }
}
