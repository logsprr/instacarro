import { Types } from 'mongoose';
import { IUser } from './user';
import { IAuction } from './auction';

export interface IBid {
  amount: number;
  user: Types.ObjectId | IUser;
  auction: Types.ObjectId | IAuction;
}
