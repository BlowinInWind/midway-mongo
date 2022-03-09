import {
  saveModule,
  Provide,
  Scope,
  ScopeEnum,
  saveClassMetadata,
} from '@midwayjs/decorator';
import { PUBLIC_KEY } from '../constants';

export function Public(route = ''): ClassDecorator {
  return (target: any) => {
    saveModule(PUBLIC_KEY, target);

    Scope(ScopeEnum.Singleton)(target);

    saveClassMetadata(
      PUBLIC_KEY,
      {
        PUBLIC_KEY: route,
      },
      target
    );

    Provide()(target);
  };
}
