import { IVehicle } from '@app/interfaces';
import { Types } from 'mongoose';
import { defaultId } from './default';

export const mockVehicleData: IVehicle = {
  color: 'Blue',
  licensePlate: 'KEF-9878',
  mileage: 1658784,
  condition: 'Used',
  model: new Types.ObjectId(defaultId),
  user: new Types.ObjectId(defaultId),
};
