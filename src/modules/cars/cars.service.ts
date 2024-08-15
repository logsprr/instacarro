import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from '@app/schemas';
import { ICar } from '@app/interfaces';
import { carCollectionName } from '@app/modules/schemas';

@Injectable()
export class CarsService {
  constructor(@InjectModel(carCollectionName) private carModel: Model<Car>) {}

  async create(values: ICar): Promise<ICar> {
    return await this.carModel.create(values);
  }

  async update(id: string, values: Partial<ICar>): Promise<ICar> {
    return await this.carModel.findByIdAndUpdate(id, values, { new: true });
  }

  async findById(id: string): Promise<ICar> {
    return await this.carModel.findById(id);
  }

  async findAll(): Promise<ICar[]> {
    return await this.carModel.find();
  }
}
