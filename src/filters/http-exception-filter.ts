import { HttpException, ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

import { MongoServerError } from 'mongodb';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    if ((exception as MongoServerError)?.code === 11000) {
      return response.status(409).json({
        statusCode: 409,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      });
    }

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.message : 'Internal server error';

    return response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
