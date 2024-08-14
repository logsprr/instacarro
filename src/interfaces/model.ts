import { Types } from 'mongoose';
import { IBrand } from './brand';

export interface IModel {
  name: string;
  year: number;
  engineType: string;
  fuelType: string;
  transmission: string;
  brand: Types.ObjectId | IBrand;
  user: Types.ObjectId;
}
