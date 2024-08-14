import { brandCollectionName, userCollectionName } from '@app/modules/schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

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
