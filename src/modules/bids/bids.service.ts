import { Model } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bid } from '@app/schemas';
import { IBid } from '@app/interfaces';
import { bidCollectionName } from '@app/modules/schemas';
import { AuctionsService } from '../auctions';
import { findOrThrow } from '@app/util';

@Injectable()
export class BidsService {
  constructor(
    @InjectModel(bidCollectionName) private bidModel: Model<Bid>,
    private readonly auctionsService: AuctionsService,
  ) {}

  async create(values: IBid): Promise<IBid> {
    const auctionId = values.auction.toString();

    const auction = await findOrThrow(auctionId, () => this.auctionsService.findById(auctionId));

    if (auction.open) {
      return await this.bidModel.create(values);
    }

    throw new ConflictException('The auction is closed to receive new bids');
  }

  async findById(id: string): Promise<IBid> {
    return await findOrThrow(id, () => this.bidModel.findById(id));
  }

  async findAll(): Promise<IBid[]> {
    return await this.bidModel.find();
  }
}
