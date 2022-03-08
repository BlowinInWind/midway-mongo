import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';

@Provide()
export class UserService {
  @InjectEntityModel()
  async getUser() {
    return {};
  }
}
