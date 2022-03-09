import { Inject, Controller, Get, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { DataObj } from '../common/class';
import { ILogger } from '@midwayjs/logger';
import { Public } from '../common/decorator';
import { AuthController } from './auth.controller';

@Controller('/user')
export class UserController extends AuthController {
  @Inject()
  // 1、在依赖注入容器中，找到对应的属性名，并赋值为对应的实例化对象
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  logger: ILogger;

  @Get('/')
  async getUserLists() {
    this.logger.info('get user');
    this.logger.warn('warning!');

    const result = await this.userService.getUserLists();
    return new DataObj(result);
  }
}