import { Types } from 'mongoose';
import { IModel } from './model';
import { IUser } from './user';
import { IPhoto } from './photo';
import { IAuction } from './auction';

export interface IVehicle {
  color: string;
  licensePlate: string;
  mileage: number;
  condition: string;
  details?: string;
  model: Types.ObjectId | IModel;
  user: Types.ObjectId | IUser;
  photo?: IPhoto;
  auction?: IAuction;
}
