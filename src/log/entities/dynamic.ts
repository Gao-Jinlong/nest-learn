import { ConsoleLogger, Inject } from '@nestjs/common';

export class DynamicLogger extends ConsoleLogger {
  @Inject('LOG_OPTION_NAME')
  private readonly name: string;

  log(message: string) {
    super.log(`---${this.name}---`, message);
  }
}
