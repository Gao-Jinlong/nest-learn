import {
  BeforeApplicationShutdown,
  Global,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
  forwardRef,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { BbbModule } from 'src/bbb/bbb.module';
import { BbbService } from 'src/bbb/bbb.service';

@Global() // 全局模块，可以在任何地方使用，但是会导致模块的依赖不清晰，不建议使用
@Module({
  imports: [
    // 循环引用时，分别创建各 module 再导入
    forwardRef(() => BbbModule),
  ],
  controllers: [AaaController],
  providers: [AaaService, BbbService],
  exports: [AaaService], // 导出服务，可以在其他模块中使用
})
export class AaaModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(
    // 当前模块的引用，可以获取到当前模块的其他服务
    private readonly moduleRef: ModuleRef,
  ) {}
  onModuleInit() {
    console.log('Aaa Module onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('Aaa Module onApplicationBootstrap');
  }
  onModuleDestroy() {
    console.log('Aaa Module onModuleDestroy');
  }
  beforeApplicationShutdown() {
    console.log('Aaa Module beforeApplicationShutdown');
  }
  onApplicationShutdown(signal?: string) {
    console.log('Aaa Module onApplicationShutdown, signal: ', signal);

    const aaaService = this.moduleRef.get<AaaService>(AaaService);
    console.log('aaaService: ', aaaService.findAll());
  }
}
