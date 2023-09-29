import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';

@Module({
  // imports: [AaaModule], // 导入模块
  controllers: [BbbController],
  providers: [BbbService],
})
export class BbbModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('Bbb Module onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('Bbb Module onApplicationBootstrap');
  }
  onModuleDestroy() {
    console.log('Bbb Module onModuleDestroy');
  }
  beforeApplicationShutdown() {
    console.log('Bbb Module beforeApplicationShutdown');
  }
  onApplicationShutdown(signal?: string) {
    console.log('Bbb Module onApplicationShutdown, signal: ', signal);
  }
}
