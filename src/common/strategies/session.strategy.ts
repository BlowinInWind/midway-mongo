import { Inject } from '@midwayjs/decorator';
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../../service/user.service';

@CustomStrategy()
export class SessionStrategy extends PassportStrategy(Strategy) {
  @Inject()
  userService: UserService;

  validate(...args: any[]) {}

  getStrategyOptions() {}

  // serializeUser(user, done) {
  //   // 可以只保存用户id
  //   done(null, user._id);
  // }

  // async deserializeUser(id, done) {
  //   // 这里不是异步方法，你可以从其他地方根据用户名，反查用户数据。
  //   const user = await this.userService.findUserById(id);
  //   done(null, user);
  // }
}
