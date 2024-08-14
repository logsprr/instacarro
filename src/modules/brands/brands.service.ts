import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '@app/schemas';
import { IBrand } from '@app/interfaces';
import { brandCollectionName } from '@app/modules/schemas';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(brandCollectionName) private brandModel: Model<Brand>) {}

  async create(values: IBrand): Promise<IBrand> {
    return await this.brandModel.create(values);
  }

  async update(id: string, values: Partial<IBrand>): Promise<IBrand> {
    return await this.brandModel.findByIdAndUpdate(id, values, { new: true });
  }

  async findById(id: string): Promise<IBrand> {
    return await this.brandModel.findById(id).exec();
  }

  async findAll(): Promise<IBrand[]> {
    return await this.brandModel.find().exec();
  }
}
