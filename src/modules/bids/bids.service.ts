import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bid, bidCollectionName } from '@app/schemas';
import { IBid } from '@app/interfaces';

@Injectable()
export class BidsService {
  constructor(@InjectModel(bidCollectionName) private bidModel: Model<Bid>) {}

  async create(values: IBid): Promise<IBid> {
    return await this.bidModel.create(values);
  }

  async findById(id: string): Promise<IBid> {
    return await this.bidModel.findById(id).exec();
  }

  async findAll(): Promise<IBid[]> {
    return await this.bidModel.find().exec();
  }
}
