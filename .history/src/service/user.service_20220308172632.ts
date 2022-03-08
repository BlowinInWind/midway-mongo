import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/user.entities';

@Provide()
// 1、这个 Class，被依赖注入容器托管，会自动被实例化（new）
// 2、这个 Class，可以被其他在容器中的 Class 注入
export class UserService {
  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  async getUser() {
    return this.userModel.find().exec();
  }
}
