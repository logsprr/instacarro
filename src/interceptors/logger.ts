import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const { method, url } = req;
    const start = Date.now();

    this.logger.log(`Request started: ${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        this.logger.log(
          `Request finished: ${method} ${url} - Status Code: ${res.status} - Duration: ${duration}ms`,
        );
      }),

      catchError(err => {
        const duration = Date.now() - start;
        this.logger.error(
          `Request finished with error: ${method} ${url} - Duration: ${duration}ms`,
          err.stack,
        );
        throw err;
      }),
    );
  }
}
