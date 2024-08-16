import { brandCollectionName, modelCollectionName, userCollectionName } from '@app/modules/schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ModelDocument = HydratedDocument<Model>;

@Schema({ collection: modelCollectionName })
export class Model {
  _id: Types.ObjectId;

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
