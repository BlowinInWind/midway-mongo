import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1646641349243_3301',
  koa: {
    port: 7001,
  },

  passport: {
    session: true,
  },

  session: {
    maxAge: 86400000, // ms
    key: 'icsoms_kdbm',
    httpOnly: true,
    encrypt: true,
    // sameSite: null,
    logValue: true,
  },

  redis: {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      db: 0,
    },
  },

  jwt: {
    expiresIn: '1d',
    secret: 'icsoms_kdbm',
  },

  // midwayLogger: {
  //   clients: {
  //     coreLogger: {
  //       level: 'warn',
  //       consoleLevel: 'warn',
  //     },
  //   },
  // },

  // mongodb
  mongoose: {
    client: {
      uri: 'mongodb://120.55.15.68:27017',
      options: {
        dbName: 'icsOmsUnicorn',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: 'root',
        pass: 'jiangtong911100',
      },
    },
  },
} as MidwayConfig;
