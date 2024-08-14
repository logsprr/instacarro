import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SchemasModule } from '@app/modules/schemas';
import { UsersModule } from '@app/modules/users';
import { ConfigModule } from '@nestjs/config';
import configs from '@app/config';
import { LoggerModule } from 'nestjs-pino';
import { setupLogger } from './log/logger';
import { JsonBodyMiddleware } from './middlewares/json-body.middleware';
import { UrlEncodedBodyMiddleware } from './middlewares/url-encoded-body.middleware';
import { MiddlewaresModule } from './middlewares/middlewares.module';
import { AuctionsModule } from './modules/auctions';
import { BidsModule } from './modules/bids';
import { BrandsModule } from './modules/brands';
import { CarsModule } from './modules/cars';
import { ModelsModule } from './modules/models';
import { PhotosModule } from './modules/photos';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
    }),
    LoggerModule.forRoot(setupLogger()),
    SchemasModule,
    MiddlewaresModule,

    AuctionsModule,
    BidsModule,
    BrandsModule,
    CarsModule,
    ModelsModule,
    PhotosModule,
    UsersModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(JsonBodyMiddleware, UrlEncodedBodyMiddleware).forRoutes('*');
  }
}
