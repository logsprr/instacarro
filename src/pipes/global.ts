import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';

export function setupValidationPipes(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: errors => {
        console.log(errors);
        return new BadRequestException(errors);
      },
    }),
  );
}
