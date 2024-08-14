import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { carCollectionName } from './car';
import { userCollectionName } from './user';

export type PhotoDocument = HydratedDocument<Photo>;

export const photoCollectionName = 'photos';

@Schema({ collection: photoCollectionName })
export class Photo {
  @Prop([String])
  external: string[];

  @Prop([String])
  internal: string[];

  @Prop([String])
  engine: string[];

  @Prop([String])
  details: string[];

  @Prop({ type: Types.ObjectId, ref: userCollectionName, required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: carCollectionName, required: true })
  car: Types.ObjectId;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
