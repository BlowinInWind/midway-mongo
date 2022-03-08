import { Catch } from '@midwayjs/decorator';
import { httpError, MidwayHttpError, HttpStatus } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    // 404 错误会到这里
    // ctx.redirect('/404.html');
    const response = ctx.response;
    const { status } = this.errorResult(err);
  }

  errorResult(exception: MidwayHttpError) {
    const status =
     
     ? 
       
      exception instanceof MidwayHttpError
        ? exception.status
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const code =
      exception instanceof ApiException
        ? (exception as ApiException).getErrCode()
        : status;

    let message: string;
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      message = (response as any).message ?? response;
    } else {
      message = `${exception}`;
    }

    return { status, result: AjaxResult.error(message, code) };
  }
}
