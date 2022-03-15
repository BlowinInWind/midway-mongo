/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Configuration, App, Config, ALL, Inject } from '@midwayjs/decorator';
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
import * as mongoose from 'mongoose';
import * as passport from '@midwayjs/passport';
import * as session from '@midwayjs/session';
// import { SessionStoreManager } from '@midwayjs/session';
// import { MemorySessionStore } from './SessionStore';

@Configuration({
  imports: [
    koa,
    redis,
    jwt,
    typegoose,
    passport,
    validate,
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

  // @Inject()
  // sessionStoreManager: SessionStoreManager;

  // @Inject()
  // memoryStore: MemorySessionStore;

  async onReady() {
    const db = await mongoose.connect('mongodb://120.55.15.68:27017', {
      user: 'root',
      pass: 'jiangtong911100',
      dbName: 'icsOmsUnicorn',
    });

    // this.sessionStoreManager.setSessionStore(this.memoryStore);

    // add middleware
    this.app.useMiddleware([SessionMiddleware, ResponseMiddleware]);

    // add filter
    this.app.useFilter([ExceptionFilter]);
  }
}
