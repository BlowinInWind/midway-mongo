import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiException } from '../common/exceptions';
import { User } from '../entity/user.entities';

@Provide()
// 1、这个 Class，被依赖注入容器托管，会自动被实例化（new）
// 2、这个 Class，可以被其他在容器中的 Class 注入
@Scope(ScopeEnum.Singleton)
export class UserService {
  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  // 获取用户列表
  async getUserLists() {
    return this.userModel.find().exec();
  }

  // 根据用户名密码验证用户
  async findUserByNameAndPasswd(username: string, passwd: string) {
    return await this.userModel.findOne({ username, passwd }).lean().exec();
  }

  // 根据id获取用户名
  async findUserById(id): Promise<User> {
    const result = await this.userModel.findOne({ _id: id }).lean();
    if (!result) {
      throw new ApiException('请求参数错误');
    }
    return result;
  }
}
