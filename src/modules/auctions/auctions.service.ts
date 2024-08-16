import { Model, Types } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auction } from '@app/schemas';
import { IAuction } from '@app/interfaces';
import { auctionCollectionName } from '@app/modules/schemas';

import moment from 'moment';
import { findOrThrow } from '@app/util';

@Injectable()
export class AuctionsService {
  constructor(@InjectModel(auctionCollectionName) private auctionModel: Model<Auction>) {}

  async create(values: IAuction): Promise<IAuction> {
    return await this.auctionModel.create(values);
  }

  async update(id: string, values: Partial<IAuction>): Promise<IAuction> {
    const auction = await findOrThrow(id, () => this.auctionModel.findById(id));

    Object.assign(auction, values);

    return await auction.save();
  }

  async close(id: string, values: Partial<IAuction>): Promise<IAuction> {
    const auction = await findOrThrow(id, () => this.auctionModel.findById(id).populate('bids'));

    const dateDiff = moment(new Date()).diff(new Date(values.endDate), 'minutes');

    if (auction.open && dateDiff >= 0 && dateDiff <= 10) {
      const bidWinner = auction.bids.reduce((previous, current) => {
        return current.amount > previous.amount ? current : previous;
      }, auction.bids[0]);

      Object.assign(auction, { ...values, open: false, bidWinner: bidWinner._id });

      return (await auction.save()).populate('bidWinner');
    }

    if (!auction.open) {
      throw new ConflictException('You cannot close an auction that is not open');
    }

    throw new ConflictException('You cannot close an auction that with the provided time');
  }

  async findById(id: string): Promise<IAuction> {
    return await findOrThrow(id, () => this.auctionModel.findById(id));
  }

  async findAll(): Promise<IAuction[]> {
    return await this.auctionModel.find();
  }

  async findAuctionByVehicleId(vehicleId: string): Promise<IAuction[]> {
    return await findOrThrow(vehicleId, () =>
      this.auctionModel
        .find({ vehicle: new Types.ObjectId(vehicleId) })
        .populate(['bidWinner', 'bids', 'vehicle', 'user']),
    );
  }
}
