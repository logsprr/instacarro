import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Photo, PhotoSchema } from './photo';
import { Bid, BidSchema } from './bid';
import { Auction, AuctionSchema } from './auction';
import { carCollectionName, modelCollectionName, userCollectionName } from '@app/modules/schemas';

export type CarDocument = HydratedDocument<Car>;

@Schema({ collection: carCollectionName })
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
  model: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: userCollectionName, required: true })
  user: Types.ObjectId;

  @Prop({ type: PhotoSchema })
  photo?: Photo;

  @Prop({ type: AuctionSchema })
  auction?: Auction;

  @Prop({ type: [BidSchema] })
  bids?: Bid[];
}

export const CarSchema = SchemaFactory.createForClass(Car);
