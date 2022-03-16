import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { ForbiddenError } from '@midwayjs/core/dist/error/http';

@Middleware()
export class SessionMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
<<<<<<< HEAD
      // console.log(ctx.cookies);
      // console.log(ctx.session.user);
      console.log(ctx.cookies.get('user'));
      // // if (ctx.isAuthenticated()) {
      // if (ctx.cookies.get('icsoms_kdbm')) {
      if (ctx.session.user) {
=======
      console.log(ctx.cookies);
      console.log(ctx.cookies.get('icsoms_kdbm'));
      if (ctx.isAuthenticated()) {
        // if (ctx.cookies.get('icsoms_kdbm')) {
>>>>>>> bcaa6a288dc4fce988798987035794442ed4e0f4
        await next();
      } else {
        throw new ForbiddenError();
      }
    };
  }

  static getName(): string {
    return 'session';
  }

  // 忽略要匹配的
  ignore(ctx?: Context): boolean {
    return ctx.url === '/login';
  }
}
