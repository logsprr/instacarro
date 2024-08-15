import { Types } from 'mongoose';
import { IUser } from './user';
import { ICar } from './car';
import { IBid } from './bid';

export interface IAuction {
  minPrice: number;
  startDate: Date;
  endDate?: Date;
  lot: number;
  open: boolean;
  user: Types.ObjectId | IUser;
  car: Types.ObjectId | ICar;
  bidWinner?: Types.ObjectId | IBid;
  bids?: IBid[];
}
