import { ForbiddenException } from './ForbiddenException';
import { ArgumentsHost, Catch } from '@nestjs/common';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    console.log('ForbiddenExceptionFilter catch exception: ', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(410).json({
      statusCode: 410,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      msg: 'ForbiddenExceptionFilter catch exception',
    });
  }
}
