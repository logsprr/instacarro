import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userCollectionName } from '@app/schemas';
import { IUser } from '@app/interfaces';

@Injectable()
export class UsersService {
  constructor(@InjectModel(userCollectionName) private userModel: Model<User>) {}

  async create(values: IUser): Promise<IUser> {
    return await this.userModel.create(values);
  }

  async update(id: string, values: Partial<IUser>): Promise<IUser> {
    return await this.userModel.findByIdAndUpdate(id, values, { new: true });
  }

  async findById(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec();
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }
}
