import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { userCollectionName } from './user';

export type BrandDocument = HydratedDocument<Brand>;

export const brandCollectionName = 'brands';

@Schema({ collection: brandCollectionName })
export class Brand {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  country: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: Types.ObjectId, ref: userCollectionName, required: true })
  user: Types.ObjectId;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
