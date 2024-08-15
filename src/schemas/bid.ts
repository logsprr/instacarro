import { auctionCollectionName, bidCollectionName, userCollectionName } from '@app/modules/schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BidDocument = HydratedDocument<Bid>;

@Schema({
  collection: bidCollectionName,
  toJSON: { getters: true, virtuals: true },
  toObject: { virtuals: true },
})
export class Bid {
  _id: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: userCollectionName, required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: auctionCollectionName, required: true })
  auction: Types.ObjectId;
}

export const BidSchema = SchemaFactory.createForClass(Bid);
