// import { Aspect, IMethodAspect, Inject, JoinPoint } from '@midwayjs/decorator';
// import { RedisService } from '@midwayjs/redis';
// import { UserController } from '../../controller/user.controller';
// import { ApiException } from '../exceptions';
// import { Utils } from '../utils';

// @Aspect(UserController)
// export class ReportInfo implements IMethodAspect {
//   @Inject()
//   utils: Utils;

//   @Inject()
//   redisService: RedisService;

//   // 方法调用前执行
//   async before(point: JoinPoint) {
//     const ctx = point.target.ctx;
//     const admin = ctx.admin;
//     const token = ctx.get('Authorization');

//     if (!admin) {
//       ctx.status = 401;
//       ctx.body = {
//         code: 200,
//         message: '登录失效~',
//       };
//     }

//     // if (admin._id) {
//     //   this.utils.jwtSign()
//     // }
//   }

//   // 包裹方法的前后执行
//   async around(joinPoint: JoinPoint) {}

//   // 正确返回内容时执行

//   async afterReturn(joinPoint: JoinPoint, result: any) {}

//   // 抛出异常时执行
//   async afterThrow(joinPoint: JoinPoint, error: Error) {}

//   // 最后执行（不管正确还是错误）
//   async after(joinPoint: JoinPoint, result: any, error: Error) {}
// }
