import { Provide, Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from './user.service';
import { Utils } from '../common/utils/index';
import { ApiException } from '../common/exceptions';

@Provide()
export class LoginService {
  @Inject()
  userService: UserService;

  @Inject()
  utils: Utils;

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

    this.ctx.session.user = result;

    return result;
  }
}
