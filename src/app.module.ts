import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { DecorateModule } from './decorate/decorate.module';
import { DynamicallyModule } from './dynamically/dynamically.module';

@Module({
  imports: [AaaModule, BbbModule, DecorateModule, DynamicallyModule],
  controllers: [AppController],
  // IoC provider 支持的几种注入方式，useClass, useValue, useFactory, useExisting
  providers: [
    // AppService, // 这是缩写
    {
      // 实际上完整的写法
      provide: AppService, // 注入 token，可以是字符串或者 symbol
      useClass: AppService, // 注入的对象的类，Nest 会自动实例化再注入
    },
    {
      // 除了注入 class 之外，还可以注入 value
      provide: 'person',
      useValue: {
        name: 'Ginlon',
        age: 18,
      },
    },
    {
      // 支持动态产生值
      // 支持异步，Nest 会在异步完成之后再注入
      provide: 'github',
      // 如果想动态注入，可以使用 useFactory，在参数中注入其他的 token
      async useFactory(
        person: { name: string; age: number },
        appService: AppService,
      ) {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        return {
          name: 'gaoo-jinlong',
          mail: '2675130594@qq.com',
          person,
          appService,
        };
      },
      inject: ['person', AppService], // 支持注入其他的 token
    },
    {
      provide: 'GitHub', // 别名
      useExisting: 'github', // 使用已经存在的 token
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('middleware config');
    // consumer.apply(someMiddleware).forRoutes('someToken') // 针对路由添加中间件
  }
}
