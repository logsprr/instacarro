import { UserSchema } from '@app/schemas/user';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import dbConfig from '@app/config/db';
import { ConfigModule, ConfigType } from '@nestjs/config';
import {
  AuctionSchema,
  BidSchema,
  BrandSchema,
  VehicleSchema,
  ModelSchema,
  PhotoSchema,
} from '@app/schemas';
import {
  auctionCollectionName,
  bidCollectionName,
  brandCollectionName,
  vehicleCollectionName,
  modelCollectionName,
  photoCollectionName,
  userCollectionName,
} from './collections';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [dbConfig.KEY],
      useFactory: async (config: ConfigType<typeof dbConfig>) => {
        return config;
      },
    }),
    MongooseModule.forFeature([
      { name: auctionCollectionName, schema: AuctionSchema },
      { name: bidCollectionName, schema: BidSchema },
      { name: brandCollectionName, schema: BrandSchema },
      { name: vehicleCollectionName, schema: VehicleSchema },
      { name: modelCollectionName, schema: ModelSchema },
      { name: photoCollectionName, schema: PhotoSchema },
      { name: userCollectionName, schema: UserSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class SchemasModule {}
