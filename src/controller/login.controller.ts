import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { LoginService } from '../service/login.service';
import { DataObj } from '../common/class/data-obj.class';
import { LocalPassportMiddleware } from '../common/middleware';

@Controller('/login')
export class LoginController {
  @Inject()
  loginService: LoginService;

  @Post('', { middleware: [LocalPassportMiddleware] })
  async login(@Body() loginDto: any) {
    const result = await this.loginService.login(loginDto);
    return DataObj.create(result);
  }
}
