import { Injectable, NestMiddleware } from '@nestjs/common';
import { urlencoded } from 'body-parser';
import { NextFunction } from 'express';
import { IncomingMessage, ServerResponse } from 'http';

@Injectable()
export class UrlEncodedBodyMiddleware implements NestMiddleware {
  use(request: IncomingMessage, response: ServerResponse, next: NextFunction) {
    urlencoded({ extended: true, limit: '100mb' })(request, response, next);
  }
}
