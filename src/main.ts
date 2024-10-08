import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

import { loadAppConfig } from '@app/config';
import { setupValidationPipes } from '@app/pipes';

import { name } from '../package.json';
import { AppModule } from './app.module';
import { HandlerInterceptor } from '@app/interceptors';
import { setupSwagger } from './docs';

async function initApplication(app: INestApplication): Promise<void> {
  app.enableCors();
  app.enableShutdownHooks();
  app.use(compression());
  app.use(helmet());

  setupValidationPipes(app);

  app.useGlobalInterceptors(new HandlerInterceptor());

  const { keepAliveTimeout } = loadAppConfig();

  app.getHttpServer().keepAliveTimeout = keepAliveTimeout;

  await setupSwagger(app);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true, bodyParser: false });
  const log = app.get(Logger);

  app.useLogger(log);

  await initApplication(app);

  app.setGlobalPrefix('api');

  const { port } = loadAppConfig();

  await app.listen(port);

  log.log(`Running ${name} on port ${port}`);

  process.on('unhandledRejection', error => {
    log.error(error);
  });
}

bootstrap();
