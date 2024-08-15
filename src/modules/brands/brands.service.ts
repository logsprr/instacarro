import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '@app/schemas';
import { IBrand } from '@app/interfaces';
import { brandCollectionName } from '@app/modules/schemas';
import { findOrThrow } from '@app/util';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(brandCollectionName) private brandModel: Model<Brand>) {}

  async create(values: IBrand): Promise<IBrand> {
    return await this.brandModel.create(values);
  }

  async update(id: string, values: Partial<IBrand>): Promise<IBrand> {
    const brand = await findOrThrow(id, () => this.brandModel.findById(id));

    Object.assign(brand, values);

    return await brand.save();
  }

  async findById(id: string): Promise<IBrand> {
    return await findOrThrow(id, () => this.brandModel.findById(id));
  }

  async findAll(): Promise<IBrand[]> {
    return await this.brandModel.find();
  }
}
