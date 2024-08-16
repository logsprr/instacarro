import { Types } from 'mongoose';
import { IUser } from './user';
import { IVehicle } from './vehicle';

export interface IPhoto {
  external: string[];
  internal: string[];
  engine: string[];
  details: string[];
  user: Types.ObjectId | IUser;
  vehicle: Types.ObjectId | IVehicle;
}
