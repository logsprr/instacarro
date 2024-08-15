import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  auctionCollectionName,
  bidCollectionName,
  carCollectionName,
  modelCollectionName,
  photoCollectionName,
  userCollectionName,
} from '@app/modules/schemas';
import { IBid } from '@app/interfaces';
import { ObjectId } from 'mongodb';

export type CarDocument = HydratedDocument<Car>;

@Schema({
  collection: carCollectionName,
  toJSON: { virtuals: true, getters: true },
})
export class Car {
  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
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

  bids?: IBid[];
}

const CarSchema = SchemaFactory.createForClass(Car);

CarSchema.virtual('photo', {
  localField: '_id',
  foreignField: 'car',
  ref: photoCollectionName,
});

CarSchema.virtual('auction', {
  localField: '_id',
  foreignField: 'car',
  ref: auctionCollectionName,
});

CarSchema.virtual('bids', {
  localField: '_id',
  foreignField: 'car',
  ref: bidCollectionName,
});

export { CarSchema };
