import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@app/schemas';
import { IUser } from '@app/interfaces';
import { userCollectionName } from '@app/modules/schemas';
import { CryptoService } from '@app/modules/crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(userCollectionName) private userModel: Model<User>,

    private readonly cryptoService: CryptoService,
  ) {}

  async create(values: IUser): Promise<IUser> {
    const password = this.cryptoService.encrypt(values.password);
    return await this.userModel.create({ ...values, password });
  }

  async update(id: string, values: Partial<IUser>): Promise<IUser> {
    return await this.userModel.findByIdAndUpdate(id, values, { new: true });
  }

  async findById(id: string): Promise<IUser> {
    return await this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email }).select('password');
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find();
  }
}
