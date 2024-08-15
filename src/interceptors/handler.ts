import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HandlerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(HandlerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const { method, url } = req;
    const start = Date.now();

    this.logger.log(`Request started: ${method} ${url}`);

    return next.handle().pipe(
      map(values => {
        return {
          statusCode: res.statusCode,
          timestamp: new Date().toISOString(),
          path: url,
          result: values,
        };
      }),

      tap(() => {
        const duration = Date.now() - start;
        this.logger.log(`Request finished: ${method} ${url} - Duration: ${duration}ms`);

        return true;
      }),

      catchError(err => {
        const duration = Date.now() - start;
        this.logger.error(
          `Request finished with error: %s ${method} ${url} - Duration: ${duration}ms`,
          err.stack,
        );

        const statusCode = (err as MongoServerError)?.code === 11000 ? 409 : 500;

        res.json({
          statusCode: statusCode,
          timestamp: new Date().toISOString(),
          path: url,
          message: err?.message,
        });

        throw err;
      }),
    );
  }
}
