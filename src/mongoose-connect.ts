'use strict';
import * as mongoose from 'mongoose';

const config = require('config-lite')({
  filename: 'default',
  config_basedir: __dirname,
  config_dir: 'config',
});

mongoose.connect(config.url, {
  dbName: config.db,
});

const connect = mongoose.connection;

connect.once('open', () => {});

connect.on('error', error => {
  mongoose.disconnect();
});

connect.on('close', () => {
  mongoose.connect(config.url);
});

export default connect;
