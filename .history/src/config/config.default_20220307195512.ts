import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1646641349243_3301',
  koa: {
    port: 7001,
  },

  // mongodb
  mongoose: {
    client: {
      uri: 'mongodb://120.55.15.68:27017/icsOmsUnicorn',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: '***********',
        pass: '***********',
      },
    },
  },
} as MidwayConfig;
