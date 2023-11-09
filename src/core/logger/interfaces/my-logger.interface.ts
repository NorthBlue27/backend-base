export interface MyLoggerInterface {
  log(message: any, context: string): void;

  fatal(message: any, context: string): void;

  error(message: any, context: string, trace?: string): void;

  warn(message: any, context: string): void;

  debug(message: any, context?: string): void;

  verbose(message: any, context: string): void;
}
