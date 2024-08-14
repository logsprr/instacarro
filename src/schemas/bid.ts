import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { userCollectionName } from './user';
import { carCollectionName } from './car';

export type BidDocument = HydratedDocument<Bid>;

export const bidCollectionName = 'bids';

@Schema({ collection: bidCollectionName })
export class Bid {
  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: userCollectionName, required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: carCollectionName, required: true })
  car: Types.ObjectId;
}

export const BidSchema = SchemaFactory.createForClass(Bid);
