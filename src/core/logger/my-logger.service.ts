import { ConsoleLogger } from '@nestjs/common';
import { MyLoggerInterface } from './interfaces/my-logger.interface';

export class MyLogger extends ConsoleLogger implements MyLoggerInterface {
  log(message: any, context: string) {
    super.log(`[INFO] ${message}`, context);
  }

  fatal(message: any, context: string) {
    super.fatal(`[FATAL] ${message}`, context);
  }

  error(message: any, context: string, trace?: string) {
    super.error(`[ERROR] ${message}`, context, trace);
  }

  warn(message: any, context: string) {
    super.warn(`[WARM] ${message}`, context);
  }

  debug(message: any, context?: string) {
    if (process.env.NODE_ENV != 'development')
      super.debug(`[DEBUG] ${message}`, context);
  }

  verbose(message: any, context: string) {
    if (process.env.NODE_ENV !== 'production') {
      super.verbose(`[VERBOSE] ${message}`, context);
    }
  }
}
