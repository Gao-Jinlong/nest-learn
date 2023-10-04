import {
  ConsoleLogger,
  Global,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { AppService } from 'src/app.service';

// 实现 logger 接口
// export class MyLogger implements LoggerService {
//   log(message: any, context?: string | undefined) {
//     console.log(`---log---${context}`, message);
//   }
//   error(message: any, context?: string | undefined) {
//     console.log(`---log---${context}`, message);
//   }
//   warn(message: any, context?: string | undefined) {
//     console.log(`---log---${context}`, message);
//   }
// }

// 继承 ConsoleLogger，重写 log 方法
@Injectable()
export class MyLogger extends ConsoleLogger implements LoggerService {
  @Inject()
  private appService: AppService;

  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: any[]): void;
  log(message: unknown, context?: unknown, ...rest: unknown[]): void {
    console.log('---log---', this.appService.getHello());
    super.log(`---log---${context}`, message, ...rest);
  }
}

@Injectable()
export class MyGlobalLogger extends ConsoleLogger {
  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: any[]): void;
  log(message: unknown, context?: unknown, ...rest: unknown[]): void {
    super.log(`---global log---${context}`, message, ...rest);
  }
}
