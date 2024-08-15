import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  auctionCollectionName,
  carCollectionName,
  modelCollectionName,
  photoCollectionName,
  userCollectionName,
} from '@app/modules/schemas';
import { ObjectId } from 'mongodb';
import { Photo } from './photo';
import { Auction } from './auction';

export type CarDocument = HydratedDocument<Car>;

@Schema({
  collection: carCollectionName,
  toJSON: { virtuals: true, getters: true },
})
export class Car {
  @Prop({ required: true })
  color: string;

  @Prop({ required: true, unique: true })
  licensePlate: string;

  @Prop({ required: true })
  mileage: number;

  @Prop({ required: true })
  condition: string;

  @Prop()
  details?: string;

  @Prop({ type: Types.ObjectId, ref: modelCollectionName, required: true })
  model: ObjectId;

  @Prop({ type: Types.ObjectId, ref: userCollectionName, required: true })
  user: ObjectId;

  photo?: Photo;

  auctions?: Auction[];
}

const CarSchema = SchemaFactory.createForClass(Car);

CarSchema.virtual('photo', {
  localField: '_id',
  foreignField: 'car',
  ref: photoCollectionName,
});

CarSchema.virtual('auctions', {
  localField: '_id',
  foreignField: 'car',
  ref: auctionCollectionName,
});

export { CarSchema };
