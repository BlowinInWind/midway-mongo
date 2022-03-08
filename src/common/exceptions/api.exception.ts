import { MidwayHttpError } from '@midwayjs/core';

export class ApiException extends MidwayHttpError {
  private errCode: number;

  constructor(msg: string, errCode?: number) {
    // 权限问题一律使用401错误码
    if (errCode && errCode === 401) {
      super(msg, 200);
      this.errCode = 401;
    } else {
      // 其他异常一律使用500错误码
      super(msg, errCode ?? 200);
      this.errCode = errCode ?? 500;
    }
  }

  getErrCode(): number {
    return this.errCode;
  }
}
