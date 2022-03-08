import { Body, Controller, Post, Session } from '@midwayjs/decorator';

@Controller('/login')
export class LoginController {
  @Post('')
  login(@Body() loginDto: any) {}
}
