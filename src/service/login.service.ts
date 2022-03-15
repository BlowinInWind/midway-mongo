import { Provide, Inject, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from './user.service';
import { Utils } from '../common/utils/index';
import { ApiException } from '../common/exceptions';
import { RedisService } from '@midwayjs/redis';

@Provide()
export class LoginService {
  @Inject()
  userService: UserService;

  @Inject()
  utils: Utils;

  @Inject()
  redisService: RedisService;

  @Inject()
  ctx: Context;

  async login(loginDto: any) {
    const result = await this.userService.findUserByNameAndPasswd(
      loginDto.username,
      loginDto.passwd
    );

    if (!result) {
      throw new ApiException('请求参数错误');
    }

    this.ctx.state.user = result;
    this.ctx.session.user = result;
    // this.ctx.cookies.set('user', JSON.stringify(result), { httpOnly: false });

    // const token = await this.utils.jwtSign(
    //   {
    //     uid: result!._id.toString(),
    //     pv: 1,
    //   },
    //   {
    //     expiresIn: '24h',
    //   }
    // );

    // await this.redisService.set(
    //   `admin:token:${result._id}`,
    //   token,
    //   'EX',
    //   60 * 60 * 24
    // );

    // this.ctx.admin = result;
    return result;
  }
}
