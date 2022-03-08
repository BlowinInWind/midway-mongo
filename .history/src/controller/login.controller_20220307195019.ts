import { Controller, Post } from '@midwayjs/decorator';

@Controller('/login')
export class LoginController {
  @Post('')
  login() {}
}
