import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './aaa/aop/RolesGuard';
import { LoggingInterceptor } from './aaa/aop/LoggingInterceptor';
import { ValidationPipe } from './aaa/aop/ValidationPipe';
import { HttpExceptionFilter } from './aaa/aop/HttpExceptionFilter';
import * as session from 'express-session';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局异常过滤
  // aop 执行顺序
  // request => Middleware => Guard => Interceptor(before) => Pipe(处理参数) => handler => Interceptor(after) => Exception Filter => response

  await app.listen(3000);

  // 生命周期
  // setTimeout(() => {
  //   app.close();
  // }, 3000);
}
bootstrap();
