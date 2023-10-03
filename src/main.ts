import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './aaa/aop/RolesGuard';
import { LoggingInterceptor } from './aaa/aop/LoggingInterceptor';
import { ValidationPipe } from './aaa/aop/ValidationPipe';
import { HttpExceptionFilter } from './aaa/aop/HttpExceptionFilter';
import * as session from 'express-session';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TimeInterceptor } from './aop/time/time.interceptor';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true, // 支持跨域
  });

  app.use(
    session({
      secret: 'Ginlon',
      cookie: { maxAge: 100000 },
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public')); // 静态资源目录
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // 视图目录
  app.setViewEngine('hbs'); // 视图引擎

  // app.use(logger); // 全局中间件，来自 express 的能力
  app.useGlobalGuards(new RolesGuard()); // 全局守卫
  app.useGlobalInterceptors(new LoggingInterceptor()); // 全局拦截器
  app.useGlobalPipes(new ValidationPipe()); // 全局管道
  // app.useGlobalFilters(new HttpExceptionFilter()); // 全局异常过滤
  // aop 执行顺序
  // request => Middleware => Guard => Interceptor(before) => Pipe(处理参数) => handler => Interceptor(after) => Exception Filter => response

  // app.useGlobalInterceptors(new TimeInterceptor()); // 全局注入拦截器无法在拦截器类中注入依赖，因为拦截器类不是一个 provider，所以无法使用 @Injectable() 装饰器
  // 若想在全局的拦截器中使用依赖注入，可以使用 nest 提供的 APP_INTERCEPTOR 将拦截器注册为全局的 provider，nest 自动实例化并注入依赖

  await app.listen(3000);

  // 生命周期
  // setTimeout(() => {
  //   app.close();
  // }, 3000);
}
bootstrap();
