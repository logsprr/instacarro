import { IBid } from '@app/interfaces';
import { Types } from 'mongoose';
import { defaultId } from './default';

export const mockBidData: IBid = {
  amount: 14223232,
  auction: new Types.ObjectId(defaultId),
  user: new Types.ObjectId(defaultId),
};
