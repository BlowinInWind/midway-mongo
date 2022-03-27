import { EntityModel } from '@midwayjs/typegoose';
import { ModelOptions, prop } from '@typegoose/typegoose';
import { ApiProperty } from '@midwayjs/swagger';

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
  @ApiProperty({ example: 'Kitty', description: 'The name of the Catname' })
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
