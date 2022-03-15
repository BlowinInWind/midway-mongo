// import { Aspect, IMethodAspect, Inject, JoinPoint } from '@midwayjs/decorator';
// import { RedisService } from '@midwayjs/redis';
// import { UserController } from '../../controller/user.controller';
// import { Utils } from '../utils';
// import { Context } from '@midwayjs/koa';

// @Aspect(UserController, 'getUserLists')
// export class UserAspect implements IMethodAspect {
//   @Inject()
//   utils: Utils;

//   @Inject()
//   redisService: RedisService;

//   // 方法调用前执行
//   async around(point: JoinPoint) {
//     const ctx: Context = point.target.ctx;

//     if (!ctx.cookies.get('icsoms_kdbm')) {
//       ctx.status = 401;
//       ctx.body = {
//         code: 200,
//         message: '登录失效~',
//       };
//     } else {
//       const result = await point.proceed(...point.args);

//       return result;
//     }

//     // if (admin._id) {
//     //   this.utils.jwtSign()
//     // }
//   }

//   // 包裹方法的前后执行
//   async before(joinPoint: JoinPoint) {}

//   // 正确返回内容时执行

//   async afterReturn(joinPoint: JoinPoint, result: any) {}

//   // 抛出异常时执行
//   async afterThrow(joinPoint: JoinPoint, error: Error) {}

//   // 最后执行（不管正确还是错误）
//   async after(joinPoint: JoinPoint, result: any, error: Error) {}
// }
