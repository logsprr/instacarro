import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auction } from '@app/schemas';
import { IAuction } from '@app/interfaces';
import { auctionCollectionName } from '@app/modules/schemas';

@Injectable()
export class AuctionsService {
  constructor(@InjectModel(auctionCollectionName) private auctionModel: Model<Auction>) {}

  async create(values: IAuction): Promise<IAuction> {
    return await this.auctionModel.create(values);
  }

  async update(id: string, values: Partial<IAuction>): Promise<IAuction> {
    return await this.auctionModel.findByIdAndUpdate(id, values, { new: true });
  }

  async findById(id: string): Promise<IAuction> {
    return await this.auctionModel.findById(id);
  }

  async findAll(): Promise<IAuction[]> {
    return await this.auctionModel.find();
  }
}
