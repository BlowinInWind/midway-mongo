import { Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';

export class AuthController {
  @Inject()
  ctx: Context;
}
