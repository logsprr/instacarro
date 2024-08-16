import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SchemasModule } from '@app/modules/schemas';
import { UsersModule } from '@app/modules/users';
import { ConfigModule } from '@nestjs/config';
import configs from '@app/config';
import { LoggerModule } from 'nestjs-pino';
import { setupLogger } from '@app/log';
import { JsonBodyMiddleware, MiddlewaresModule, UrlEncodedBodyMiddleware } from '@app/middlewares';
import { AuctionsModule } from '@app/modules/auctions';
import { BidsModule } from '@app/modules/bids';
import { BrandsModule } from '@app/modules/brands';
import { ModelsModule } from '@app/modules/models';
import { PhotosModule } from '@app/modules/photos';
import { AuthModule } from '@app/modules/auth';
import { CryptoModule } from '@app/modules/crypto';
import { VehiclesModule } from '@app/modules/vehicles';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
    }),
    LoggerModule.forRoot(setupLogger()),
    SchemasModule,
    MiddlewaresModule,

    AuthModule,
    CryptoModule,
    AuctionsModule,
    BidsModule,
    BrandsModule,
    VehiclesModule,
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
