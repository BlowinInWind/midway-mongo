import { Controller, Get } from '@midwayjs/decorator';
import { ApiTags } from '@midwayjs/swagger';
import { AuthController } from './auth.controller';

@ApiTags(['hello'])
@Controller('/')
export class HomeController extends AuthController {
  @Get('/hello')
  @ApiTags('')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
}
