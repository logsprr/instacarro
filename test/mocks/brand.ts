import { IBrand } from '@app/interfaces';
import { Types } from 'mongoose';
import { defaultId } from './default';

export const mockBrandData: IBrand = {
  name: 'Volkswagen',
  country: 'Brazil',
  user: new Types.ObjectId(defaultId),
};
