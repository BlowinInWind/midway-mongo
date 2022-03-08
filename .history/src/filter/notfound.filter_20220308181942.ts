import { Catch } from '@midwayjs/decorator';
import { httpError, MidwayHttpError, HttpStatus } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiException } from '../common/exceptions';
import { AjaxResult } from '../common/class';

@Catch()
export class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    // 404 错误会到这里
    // ctx.redirect('/404.html');
    const { result } = this.errorResult(err);

    // response.header['Content-Type'] = 'application/json; charset=utf-8';
    // response.status = status;
    // response.toJSON
    // response.status(status).json(result);

    return result;
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
