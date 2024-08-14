import { UserSchema } from '@app/schemas/user';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import dbConfig from '@app/config/db';
import { ConfigModule, ConfigType } from '@nestjs/config';
import {
  AuctionSchema,
  BidSchema,
  BrandSchema,
  CarSchema,
  ModelSchema,
  PhotoSchema,
} from '@app/schemas';
import {
  auctionCollectionName,
  bidCollectionName,
  brandCollectionName,
  carCollectionName,
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
    MongooseModule.forFeature([{ name: auctionCollectionName, schema: AuctionSchema }]),
    MongooseModule.forFeature([{ name: bidCollectionName, schema: BidSchema }]),
    MongooseModule.forFeature([{ name: brandCollectionName, schema: BrandSchema }]),
    MongooseModule.forFeature([{ name: carCollectionName, schema: CarSchema }]),
    MongooseModule.forFeature([{ name: modelCollectionName, schema: ModelSchema }]),
    MongooseModule.forFeature([{ name: photoCollectionName, schema: PhotoSchema }]),
    MongooseModule.forFeature([{ name: userCollectionName, schema: UserSchema }]),
  ],
  exports: [MongooseModule],
})
export class SchemasModule {}
