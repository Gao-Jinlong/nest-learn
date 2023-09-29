import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('intercept before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`intercept after... ${Date.now() - now}ms`)));
  }
}
