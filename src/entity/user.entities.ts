import { EntityModel } from '@midwayjs/typegoose';
import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@midwayjs/swagger';
import { Group } from './group.entities';

interface Staff {
  name?: string;
  staffId?: string;
}

@EntityModel()
@ModelOptions({
  schemaOptions: { collection: 'users' },
  // options: { customName: 'users' },
})
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

  @prop({ ref: () => Group })
  userGroups?: Ref<Group>[];

  @prop({ ref: () => Group })
  sss?: Ref<Group>[];
}
