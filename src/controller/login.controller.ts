import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { LoginService } from '../service/login.service';
import { Context } from '@midwayjs/koa';
import { DataObj } from '../common/class/data-obj.class';

@Controller('/login')
export class LoginController {
  @Inject()
  loginService: LoginService;

  @Post('/')
  async login(@Body() loginDto: any) {
    const result = await this.loginService.login(loginDto);
    return DataObj.create(result);
  }
}
