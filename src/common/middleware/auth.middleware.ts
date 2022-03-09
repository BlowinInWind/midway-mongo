import { IMiddleware } from '@midwayjs/core';
import { Middleware, listModule, getClassMetadata } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { AjaxResult } from '../class';
import { PUBLIC_KEY } from '../constants';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const modules = listModule(PUBLIC_KEY);
      for (const mod of modules) {
        console.log(mod);
        const assa = getClassMetadata(PUBLIC_KEY, mod);
        console.log(assa);
        // 实现自定义能力
        // 比如，拿元数据 getClassMetadata(mod)
        // 比如，提前初始化 app.applicationContext.getAsync(mod);
      }
      next();
    };
  }

  static getName(): string {
    return 'auth';
  }
}
