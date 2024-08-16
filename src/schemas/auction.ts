import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  auctionCollectionName,
  bidCollectionName,
  vehicleCollectionName,
  userCollectionName,
} from '@app/modules/schemas';
import { Bid } from './bid';

export type AuctionDocument = HydratedDocument<Auction>;

@Schema({ collection: auctionCollectionName, toJSON: { virtuals: true, getters: true } })
export class Auction {
  _id: Types.ObjectId;

  @Prop({ required: true })
  minPrice: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate?: Date;

  @Prop({ required: true })
  lot: number;

  @Prop({ required: true })
  open: boolean;

  @Prop({ type: Types.ObjectId, ref: userCollectionName, required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: vehicleCollectionName, required: true })
  vehicle: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: bidCollectionName })
  bidWinner?: Types.ObjectId;

  bids?: Bid[];
}

const AuctionSchema = SchemaFactory.createForClass(Auction);

AuctionSchema.virtual('bids', {
  localField: '_id',
  foreignField: 'auction',
  ref: bidCollectionName,
});

export { AuctionSchema };
