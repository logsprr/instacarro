import { Model as MongooseModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IModel } from '@app/interfaces';
import { Model } from '@app/schemas';
import { modelCollectionName } from '@app/modules/schemas';

@Injectable()
export class ModelsService {
  constructor(@InjectModel(modelCollectionName) private modelModel: MongooseModel<Model>) {}

  async create(values: IModel): Promise<IModel> {
    return await this.modelModel.create(values);
  }

  async update(id: string, values: Partial<IModel>): Promise<IModel> {
    return await this.modelModel.findByIdAndUpdate(id, values, { new: true });
  }

  async findById(id: string): Promise<IModel> {
    return await this.modelModel.findById(id).exec();
  }

  async findAll(): Promise<IModel[]> {
    return await this.modelModel.find().exec();
  }
}
