import { Configuration, App, Config, ALL } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as typegoose from '@midwayjs/typegoose';
import { ExceptionFilter } from './common/filter';
import { ResponseMiddleware, SessionMiddleware } from './common/middleware';
import { ILifeCycle } from '@midwayjs/core';
import * as redis from '@midwayjs/redis';
import * as jwt from '@midwayjs/jwt';
import * as passport from '@midwayjs/passport';

@Configuration({
  imports: [
    koa,
    redis,
    jwt,
    typegoose,
    validate,
    passport,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: koa.Application;

  @Config(ALL)
  allConfig;

  async onReady() {
    // add middleware
    this.app.useMiddleware([SessionMiddleware, ResponseMiddleware]);

    // add filter
    this.app.useFilter([ExceptionFilter]);
  }
}
//通过sid生成用于redis保存的key
function getRedisSessionID(sid) {
  return `ssid:${sid}`;
}
