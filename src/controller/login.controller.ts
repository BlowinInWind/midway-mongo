import { Body, Controller, Inject, Post, Session } from '@midwayjs/decorator';
import { LoginService } from '../service/login.service';
import { DataObj } from '../common/class/data-obj.class';
import { LocalPassportMiddleware } from '../common/middleware';
import { Context } from '@midwayjs/koa';
import { MongoStore } from '../MongoStore';
@Controller('/login')
export class LoginController {
  @Inject()
  loginService: LoginService;

  @Inject()
  ctx: Context;

  // @Inject()
  // mongoStore: MongoStore;

  @Post('', { middleware: [LocalPassportMiddleware] })
  async login(@Body() loginDto: any, @Session() session) {
    // this.ctx.cookies.set('user', '11');
    const result = await this.loginService.login(loginDto);
    session.user = result;
    // this.ctx.login();
    return DataObj.create(result);
  }

  @Post('/out')
  async loginout(@Body() loginDto: any) {
    // this.mongoStore.destroy(this.ctx.session._externalKey);
    return { msg: 'success' };
  }
}
