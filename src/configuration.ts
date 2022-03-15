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
import * as passport from '@midwayjs/passport';
import * as pass from 'passport';
import * as session from '@midwayjs/express-session';
const MongoStore = require('connect-mongo');

@Configuration({
  imports: [
    koa,
    redis,
    jwt,
    typegoose,
    passport,
    validate,
    session,
    // passport,
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

  @Inject()
  sessionStoreManager: session.SessionStoreManager;

  async onReady() {
    this.sessionStoreManager.setSessionStore(
      new MongoStore({
        mongoUrl: 'mongodb://root:jiangtong911100@120.55.15.68:27017',
        dbName: 'icsOmsUnicorn',
        collectionName: 'sessions',
      }),
      {
        checkPeriod: 86400000, // prune expired entries every 24h
      }
    );

    // @ts-ignore
    this.app.use(pass.initialize());
    // passport.initialize();
    this.app.use(pass.session());

    // add middleware
    this.app.useMiddleware([SessionMiddleware, ResponseMiddleware]);

    // add filter
    this.app.useFilter([ExceptionFilter]);
  }
}
