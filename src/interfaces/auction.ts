import { Types } from 'mongoose';
import { IUser } from './user';
import { IVehicle } from './vehicle';
import { IBid } from './bid';

export interface IAuction {
  minPrice: number;
  startDate: Date;
  endDate?: Date;
  lot: number;
  open: boolean;
  user: Types.ObjectId | IUser;
  vehicle: Types.ObjectId | IVehicle;
  bidWinner?: Types.ObjectId | IBid;
  bids?: IBid[];
}
