import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Photo } from '@app/schemas';
import { IPhoto } from '@app/interfaces';
import { photoCollectionName } from '@app/modules/schemas';
import { findOrThrow } from '@app/util';

@Injectable()
export class PhotosService {
  constructor(@InjectModel(photoCollectionName) private photoModel: Model<Photo>) {}

  async create(values: IPhoto): Promise<IPhoto> {
    return await this.photoModel.create(values);
  }

  async update(id: string, values: Partial<IPhoto>): Promise<IPhoto> {
    const photo = await findOrThrow(id, () => this.photoModel.findById(id));

    Object.assign(photo, values);

    return await photo.save();
  }

  async findById(id: string): Promise<IPhoto> {
    return await findOrThrow(id, () => this.photoModel.findById(id));
  }

  async findAll(): Promise<IPhoto[]> {
    return await this.photoModel.find();
  }
}
