import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { auctionCollectionName, carCollectionName, userCollectionName } from '@app/modules/schemas';

export type AuctionDocument = HydratedDocument<Auction>;

@Schema({ collection: auctionCollectionName })
export class Auction {
  @Prop({ required: true })
  minPrice: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  lot: number;

  @Prop({ required: true })
  open: boolean;

  @Prop({ type: Types.ObjectId, ref: userCollectionName, required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: carCollectionName, required: true })
  car: Types.ObjectId;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
