import {
  BeforeApplicationShutdown,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';
import { AaaModule } from 'src/aaa/aaa.module';
import { MyMiddlewareMiddleware } from 'src/aop/myMiddleware/myMiddleware.middleware';
import { Request, Response } from 'express';

@Module({
  // imports: [AaaModule], // 导入模块
  imports: [
    // 循环引用时单独创建每个模块，然后导入
    forwardRef(() => AaaModule),
  ],
  controllers: [BbbController],
  providers: [
    BbbService,
    {
      provide: 'validation_options',
      useFactory() {
        return {
          name: String,
          age: Number,
        };
      },
    },
  ],
})
export class BbbModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown,
    NestModule
{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyMiddlewareMiddleware).forRoutes({
      path: 'bbb/hello*',
      method: RequestMethod.GET,
    });
    consumer
      .apply((req: Request, res: Response, next: () => void) => {
        // 函数式中间件，不能使用依赖注入
        console.log('middleware function', req.url, res.statusCode);
        next();
      })
      .forRoutes('*');
  }
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
