import { IAuction, IBid } from '@app/interfaces';
import { Types } from 'mongoose';
import { defaultId } from './default';

export const mockAuctionData: IAuction = {
  minPrice: 1000,
  startDate: new Date(),
  endDate: new Date(Date.now() + 86400000),
  lot: 9878787878,
  open: true,
  vehicle: new Types.ObjectId(defaultId),
  user: new Types.ObjectId(defaultId),
  bids: [
    { amount: 100, _id: defaultId },
    { amount: 200, _id: defaultId + '123' },
  ] as unknown as IBid[],
};
