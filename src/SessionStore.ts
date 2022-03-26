const schema = {
  _id: String,
  data: Object,
  updatedAt: {
    default: new Date(),
    expires: 86400, // 1 day
    type: Date,
  },
};
export default class MongooseStore {
  session: any;

  constructor({
    collection = 'sessions',
    connection = null,
    expires = 86400,
    name = 'Session',
  } = {}) {
    if (!connection) {
      throw new Error('params connection is not collection');
    }
    const updatedAt = { ...schema.updatedAt, expires };
    const { model, Schema } = connection;
    this.session = model(
      name,
      new Schema({ ...schema, updatedAt }, collection)
    );
  }

  async destroy(id) {
    const { session } = this;
    return session.remove({ _id: id });
  }

  async get(id) {
    const { session } = this;
    const { data } = await session.findById(id);
    return data;
  }

  async set(id, data, maxAge, { changed, rolling }) {
    if (changed || rolling) {
      const { session } = this;
      const record = { _id: id, data, updatedAt: new Date() };
      await session.findByIdAndUpdate(id, record, { upsert: true, safe: true });
    }
    return data;
  }

  static create(opts) {
    return new MongooseStore(opts);
  }
}
