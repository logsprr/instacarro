import { Injectable, NestMiddleware } from '@nestjs/common';
import { json } from 'body-parser';
import { NextFunction } from 'express';
import { IncomingMessage, ServerResponse } from 'http';

@Injectable()
export class JsonBodyMiddleware implements NestMiddleware {
  use(request: IncomingMessage, response: ServerResponse, next: NextFunction) {
    json({ limit: '100mb' })(request, response, next);
  }
}
