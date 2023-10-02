import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  Observable,
  TimeoutError,
  catchError,
  map,
  tap,
  throwError,
  timeout,
} from 'rxjs';
import { AaaService } from 'src/aaa/aaa.service';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TimeInterceptor.name);
  @Inject(AaaService)
  private readonly aaaService;
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next
      .handle()

      .pipe(
        tap(() => console.log(`After...${Date.now() - now}ms`)),
        timeout(1000),
        catchError((err) => {
          if (err instanceof TimeoutError) {
            return throwError(() => new RequestTimeoutException());
          }
          this.logger.error(err);
          return throwError(() => err);
        }),
        map((data) => {
          return {
            code: 200,
            message: 'sucess',
            data,
            aaa: this.aaaService.findAll(),
          };
        }),
        tap((data) => {
          this.logger.log('log something', data);
        }),
      );
  }
}
