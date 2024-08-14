import { Module } from '@nestjs/common';

import { JsonBodyMiddleware } from './json-body.middleware';
import { UrlEncodedBodyMiddleware } from './url-encoded-body.middleware';

@Module({
  providers: [JsonBodyMiddleware, UrlEncodedBodyMiddleware],
  exports: [JsonBodyMiddleware, UrlEncodedBodyMiddleware],
})
export class MiddlewaresModule {}
