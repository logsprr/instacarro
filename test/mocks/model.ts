import { IModel } from '@app/interfaces';
import { Types } from 'mongoose';
import { defaultId } from './default';

export const mockModelData: IModel = {
  name: 'T-Cross',
  year: 2024,
  engineType: 'Turbo 1.4L 250 TSI',
  fuelType: 'Flex',
  transmission: 'DSG',
  brand: new Types.ObjectId(defaultId),
  user: new Types.ObjectId(defaultId),
};
