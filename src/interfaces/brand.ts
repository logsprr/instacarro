import { Types } from 'mongoose';
import { IUser } from './user';

export interface IBrand {
  name: string;
  country: string;
  description?: string;
  user: Types.ObjectId | IUser;
}
