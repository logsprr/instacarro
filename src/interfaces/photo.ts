import { Types } from 'mongoose';
import { IUser } from './user';
import { ICar } from './car';

export interface IPhoto {
  external: string[];
  internal: string[];
  engine: string[];
  details: string[];
  user: Types.ObjectId | IUser;
  car: Types.ObjectId | ICar;
}
