import { Types } from 'mongoose';
import { IUser } from './user';
import { ICar } from './car';

export interface IAuction {
  minPrice: number;
  startDate: Date;
  endDate: Date;
  lot: number;
  open: boolean;
  user: Types.ObjectId | IUser;
  car: Types.ObjectId | ICar;
}
