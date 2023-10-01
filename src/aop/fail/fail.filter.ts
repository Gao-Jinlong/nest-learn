import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FailException } from './FailException';

@Catch(FailException)
export class FailFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    console.log('FailFilter', exception, host);

    // 通过 host.getType() 可以判断当前请求的连接类型
    // 根据不同的连接类型，返回不同的响应
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      response.status(500).json({
        statusCode: 500,
        connectionType: 'http',
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception['msg'],
      });
    } else if (host.getType() === 'ws') {
      return {
        statusCode: 500,
        connectionType: 'ws',
        timestamp: new Date().toISOString(),
      };
    } else if (host.getType() === 'rpc') {
      return {
        statusCode: 500,
        connectionType: 'rpc',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
