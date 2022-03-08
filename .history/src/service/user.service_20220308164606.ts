import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { User } from '../entity/user.entities';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  async getUser() {
    return {};
  }
}
