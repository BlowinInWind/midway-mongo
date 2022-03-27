import { Inject, Controller, Get, Session } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { DataObj } from '../common/class';
import { ILogger } from '@midwayjs/logger';
import { fnMiddleware } from '../common/middleware/route.middleware';

@Controller('/user')
export class UserController {
  @Inject()
  // 1、在依赖注入容器中，找到对应的属性名，并赋值为对应的实例化对象
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  logger: ILogger;

  // @Inject()
  // mongoStore: MongoStore;

  @Get('/list', { middleware: [fnMiddleware('1')] })
  async getUserLists(@Session() session) {
    // this.logger.info('get user');
    // this.logger.warn('warning!');
    // this.logger.info('session!', session);
    await this.ctx.cookies.set('foo', 'bar', { encrypt: true });
    // get cookie
    // console.log(this.ctx.cookies.get('foo', { encrypt: true }));

    return new DataObj({
      cookie: this.ctx.cookies.get('icsoms_kdbm'),
    });
  }
}
