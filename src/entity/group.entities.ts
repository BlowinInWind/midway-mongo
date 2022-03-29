import { EntityModel } from '@midwayjs/typegoose';
import { ModelOptions, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';

@EntityModel()
@ModelOptions({
  schemaOptions: { collection: 'userGroups' },
  // options: { customName: 'userGroups' },
})
export class Group {
  @prop({
    type: String,
    required: true,
    unique: true,
  })
  uGroupName: string;

  @prop({
    type: String,
    required: true,
    unique: true,
  })
  uOrgName: string;

  @prop({
    type: String,
    required: true,
    unique: true,
  })
  workplace: string;

  @prop({
    type: ObjectId,
  })
  _id: ObjectId;
}
