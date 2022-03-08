import { prop } from '@typegoose/typegoose';
import { EntityModel, EntityModel } from '@midwayjs/typegoose';

@EntityModel()
export class User {
  @prop()
  public username: string;
}
