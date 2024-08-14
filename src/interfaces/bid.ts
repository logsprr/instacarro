import { Types } from 'mongoose';
import { IUser } from './user';
import { ICar } from './car';

export interface IBid {
  amount: number;
  user: Types.ObjectId | IUser;
  car: Types.ObjectId | ICar;
}
