import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  auctionCollectionName,
  vehicleCollectionName,
  modelCollectionName,
  photoCollectionName,
  userCollectionName,
} from '@app/modules/schemas';
import { ObjectId } from 'mongodb';
import { Photo } from './photo';
import { Auction } from './auction';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema({
  collection: vehicleCollectionName,
  toJSON: { virtuals: true, getters: true },
})
export class Vehicle {
  _id: Types.ObjectId;

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

const VehicleSchema = SchemaFactory.createForClass(Vehicle);

VehicleSchema.virtual('photo', {
  localField: '_id',
  foreignField: 'vehicle',
  ref: photoCollectionName,
});

VehicleSchema.virtual('auctions', {
  localField: '_id',
  foreignField: 'vehicle',
  ref: auctionCollectionName,
});

export { VehicleSchema };
