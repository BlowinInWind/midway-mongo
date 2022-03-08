import { Catch } from '@midwayjs/decorator';
import { httpError, MidwayHttpError, HttpStatus } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiException } from '../exceptions';
import { AjaxResult } from '../class';

@Catch()
export class ExceptionFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    const { status, result } = this.errorResult(err);
    ctx.body = result;
    ctx.status = status;
    // return result;
  }

  errorResult(exception: MidwayHttpError) {
    const status =
      exception instanceof MidwayHttpError
        ? exception.status
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const code =
      exception instanceof ApiException
        ? (exception as ApiException).getErrCode()
        : status;

    let message: string;
    if (exception instanceof MidwayHttpError) {
      message = exception?.message ?? '请求错误';
    } else {
      message = `${exception}`;
    }

    return { status, result: AjaxResult.error(message, code) };
  }
}
