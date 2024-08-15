import { bidCollectionName, carCollectionName, userCollectionName } from '@app/modules/schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BidDocument = HydratedDocument<Bid>;

@Schema({
  collection: bidCollectionName,
  toJSON: { getters: true, virtuals: true },
  toObject: { virtuals: true },
})
export class Bid {
  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: userCollectionName, required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: carCollectionName, required: true })
  car: Types.ObjectId;
}

export const BidSchema = SchemaFactory.createForClass(Bid);
