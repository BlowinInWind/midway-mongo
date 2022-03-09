import { Provide, Inject } from '@midwayjs/decorator';
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

  async login(loginDto: any, ctx: Context) {
    const result = await this.userService.findUserByNameAndPasswd(
      loginDto.username,
      loginDto.passwd
    );

    if (!result) {
      throw new ApiException('请求参数错误');
    }

    const token = await this.utils.jwtSign(
      {
        uid: parseInt(result!._id.toString()),
        pv: 1,
      },
      {
        expiresIn: '24h',
      }
    );

    console.log(result._id);
    await this.redisService.set(
      `admin:token:${result._id}`,
      token,
      'EX',
      60 * 60 * 24
    );

    ctx.set('userId', loginDto.username);

    // ctx.state.user.id = loginDto.username;

    return { token };
  }
}
