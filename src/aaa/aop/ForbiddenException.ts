import { HttpException, HttpStatus } from '@nestjs/common';
export class ForbiddenException extends HttpException {
  constructor() {
    // 自定义扩展错误类型
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
