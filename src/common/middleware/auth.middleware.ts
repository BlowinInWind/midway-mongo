import { IMiddleware } from '@midwayjs/core';
import {
  Middleware,
  listModule,
  getClassMetadata,
  Inject,
} from '@midwayjs/decorator';
import { ExtractJwt } from 'passport-jwt';
import { NextFunction, Context } from '@midwayjs/koa';
import { RedisService } from '@midwayjs/redis';
import { Utils } from '../utils';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  utils: Utils;

  @Inject()
  redisService: RedisService;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const url = ctx.url;
      if (url !== '/login') {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(ctx.request);
        // const token = ctx.get('Authorization').slice(7);
        if (!token) {
          ctx.status = 401;
          ctx.body = {
            code: 200,
            message: '无权限',
          };
          return;
        } else {
          const result = await this.utils.jwtVerify(token);

          const redisToken = await this.redisService.get(
            `admin:token:${result.uid}`
          );

          if (token === redisToken) {
            ctx.adminId = result.uid;
            await next();
            return;
          } else {
            ctx.status = 401;
            ctx.body = {
              code: 200,
              message: '无权限',
            };
            return;
          }
        }
      }
      await next();
    };
  }

  static getName(): string {
    return 'auth';
  }
}
