import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { brandCollectionName } from './brand';
import { userCollectionName } from './user';

export type ModelDocument = HydratedDocument<Model>;

export const modelCollectionName = 'models';

@Schema({ collection: modelCollectionName })
export class Model {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  engineType: string;

  @Prop({ required: true })
  fuelType: string;

  @Prop({ required: true })
  transmission: string;

  @Prop({ type: Types.ObjectId, ref: brandCollectionName, required: true })
  brand: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: userCollectionName, required: true })
  user: Types.ObjectId;
}

export const ModelSchema = SchemaFactory.createForClass(Model);
