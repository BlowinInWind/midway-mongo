import { Controller, Get } from '@midwayjs/decorator';
import { AuthController } from './auth.controller';

@Controller('/')
export class HomeController extends AuthController {
  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
}
