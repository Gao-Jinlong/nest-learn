import { DynamicModule, Global, Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { MyGlobalLogger } from './entities/myLogger';
import { DynamicLogger } from './entities/dynamic';
import { LogService } from './log.service';

// 以模块形式全局导出 logger 模块
@Global()
@Module({})
export class LogModule {
  static register(name): DynamicModule {
    return {
      module: LogModule,
      controllers: [LogController],
      providers: [
        LogService,
        MyGlobalLogger,
        DynamicLogger,
        {
          provide: 'LOG_OPTION_NAME',
          useValue: name,
        },
      ],
      exports: [MyGlobalLogger, DynamicLogger],
    };
  }
}
