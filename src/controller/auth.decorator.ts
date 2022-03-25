import { createCustomMethodDecorator } from '@midwayjs/decorator';

export const LOGGING_KEY = 'decorator:logging_key';

export function LoggingTime(formatUnit = 'ms'): MethodDecorator {
  // 我们传递了一个可以修改展示格式的参数
  return createCustomMethodDecorator(LOGGING_KEY, { formatUnit });
}
