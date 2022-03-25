import { SessionStore } from '@midwayjs/session';
import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import * as mongodb from 'mongodb';

const unit = a => a;
function defaultSerializeFunction(session) {
  const obj: Record<string, any> = {};
  let prop;
  for (prop in session) {
    if (prop === 'cookie') {
      obj.cookie = session.cookie.toJSON
        ? session.cookie.toJSON()
        : session.cookie;
    } else {
      obj[prop] = session[prop];
    }
  }
  return obj;
}

function computeTransformFunctions(options) {
  if (options.serialize || options.unSerialize) {
    return {
      serialize: options.serialize || defaultSerializeFunction,
      unSerialize: options.unSerialize || unit,
    };
  }
  if (options.stringify === false) {
    return {
      serialize: defaultSerializeFunction,
      unSerialize: unit,
    };
  }
  // Default case
  return {
    serialize: JSON.stringify,
    unSerialize: JSON.parse,
  };
}

@Provide()
@Scope(ScopeEnum.Singleton)
export class MongoStore extends SessionStore {
  private transformFunctions;
  private collectionMaster;
  private options;
  private timer: NodeJS.Timeout;

  constructor() {
    super();
    const options = {
      collectionName: 'sessions',
      ttl: 86400000,
      mongoOptions: {},
      autoRemove: 'native',
      autoRemoveInterval: 10,
      touchAfter: 0,
      stringify: false,
      dbName: 'icsOmsUnicorn',
      mongoUrl: 'mongodb://root:jiangtong911100@120.55.15.68:27017',
    };

    this.transformFunctions = computeTransformFunctions(options);
    const client = new mongodb.MongoClient(options.mongoUrl);
    this.options = options;

    async function main() {
      await client.connect();
      const db = client.db(options.dbName);
      const collection = db.collection(options.collectionName);

      return collection;
    }

    main()
      .then(async c => {
        this.collectionMaster = c;
        await this.setAutoRemove(c);
      })
      .catch(console.error);
  }

  setAutoRemove(collection) {
    const removeQuery = () => ({
      expires: {
        $lt: new Date(),
      },
    });
    switch (this.options.autoRemove) {
      case 'native':
        return collection.createIndex(
          { expires: 1 },
          {
            background: true,
            expireAfterSeconds: 0,
            writeConcern: this.options.writeOperationOptions,
          }
        );
      case 'interval':
        this.timer = setInterval(
          () =>
            collection.deleteMany(removeQuery(), {
              writeConcern: {
                w: 0,
                j: false,
              },
            }),
          this.options.autoRemoveInterval * 1000 * 60
        );
        this.timer.unref();
        return Promise.resolve();
      case 'disabled':
      default:
        return Promise.resolve();
    }
  }

  computeStorageId(sessionId) {
    return sessionId;
  }

  async get(sid) {
    try {
      const collection = await this.collectionMaster;
      const session = await collection.findOne({
        _id: this.computeStorageId(sid),
        $or: [
          { expires: { $exists: false } },
          { expires: { $gt: new Date() } },
        ],
      });

      const s = session && this.transformFunctions.unSerialize(session.session);
      if (
        this.options.touchAfter > 0 &&
        (session === null || session === void 0 ? void 0 : session.lastModified)
      ) {
        s.lastModified = session.lastModified;
      }

      return s;
    } catch (error) {
      console.log(error);
    }
  }

  async set(sid, session) {
    let _a: Record<string, any>;
    try {
      const s: {
        _id: string;
        session: any;
        expires?: any;
      } = {
        _id: this.computeStorageId(sid),
        session: this.transformFunctions.serialize(session),
      };
      if (
        (_a =
          session === null || session === void 0 ? void 0 : session.cookie) ===
          null || _a === void 0
          ? void 0
          : _a.expires
      ) {
        s!.expires = new Date(session.cookie.expires);
      } else {
        s!.expires = new Date(Date.now() + this.options.ttl);
      }

      const collection = await this.collectionMaster;
      try {
        await collection.updateOne(
          { _id: s._id },
          { $set: s },
          {
            upsert: true,
            writeConcern: this.options.writeOperationOptions,
          }
        );
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async destroy(sid) {
    const collection = await this.collectionMaster;

    try {
      await collection.deleteOne(
        { _id: this.computeStorageId(sid) },
        { writeConcern: this.options.writeOperationOptions }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async clear() {
    await this.collectionMaster.then(collection => collection.drop());
  }

  // async get(key) {
  //   return this.sessions[key];
  // }

  // async set(key, value) {
  //   this.sessions[key] = value;
  // }

  // async destroy(key) {
  //   this.sessions[key] = undefined;
  // }
}
