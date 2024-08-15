import { brandCollectionName, userCollectionName } from '@app/modules/schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';
import { User } from './user';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ collection: brandCollectionName })
export class Brand {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  country: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: ObjectId, ref: userCollectionName, required: true })
  user: User;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
