import { userCollectionName } from '@app/modules/schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: userCollectionName })
export class User {
  _id: Types.ObjectId;

  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
