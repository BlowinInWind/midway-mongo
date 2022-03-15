import { EntityModel } from '@midwayjs/typegoose';
import { ModelOptions, prop } from '@typegoose/typegoose';

interface Staff {
  name?: string;
  staffId?: string;
}

@EntityModel()
@ModelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
export class User {
  // 用户名
  @prop({
    type: String,
    required: true,
    unique: true,
  })
  username: string;

  // 密码
  @prop({
    type: String,
    required: true,
  })
  passwd: string;

  @prop({
    type: String,
    required: true,
  })
  uOrgName: string;

  @prop({
    type: Boolean,
  })
  isDimission?: boolean;

  @prop({
    type: Boolean,
  })
  isInitial?: boolean;

  staff: Staff;
}
