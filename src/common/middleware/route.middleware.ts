// src/middleware/another.middleware.ts
import { Context } from '@midwayjs/koa';

export function fnMiddleware(name) {
  return async function (ctx: Context, next) {
    console.log(name);
    console.log(ctx);

    await next();
  };
}

// export async function fnMiddleware(ctx, next) {
//   // ...
//   await next();
//   // ...
// }
