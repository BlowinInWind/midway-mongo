import { Inject, Controller, Get, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { DataObj } from '../common/class';

@Controller('/user')
export class APIController {
  @Inject()
  // 1、在依赖注入容器中，找到对应的属性名，并赋值为对应的实例化对象\
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/')
  async getUser() {
    const result = await this.userService.getUser();
    return new DataObj(result);
  }
}
