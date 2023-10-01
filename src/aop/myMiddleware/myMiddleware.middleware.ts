import { Injectable, NestMiddleware, Optional } from '@nestjs/common';
import { Request, Response } from 'express';
import { BbbService } from 'src/bbb/bbb.service';

@Injectable()
export class MyMiddlewareMiddleware implements NestMiddleware {
  constructor(
    @Optional()
    private readonly bbbService: BbbService,
  ) {}
  use(req: Request, res: Response, next: () => void) {
    console.log('MyMiddleware before');
    console.log('MyMiddleware IoC bbbService:', this.bbbService?.findAll());
    next();
    console.log('MyMiddleware after');
  }
}

// interceptor 是能从 ExecutionContext 里拿到目标 class 和 handler，进而通过 reflector 拿到它的 metadata 等信息的，这些 middleware 就不可以。
// interceptor 里是可以用 rxjs 的操作符来组织响应处理流程的：
// middleware 更适合处理通用的逻辑，比如日志、权限、缓存等，而 interceptor 更适合处理与业务强相关的逻辑，比如异常处理、数据转换等。
