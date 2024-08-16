import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle } from '@app/schemas';
import { IVehicle } from '@app/interfaces';
import { vehicleCollectionName } from '@app/modules/schemas';
import { findOrThrow } from '@app/util';

@Injectable()
export class VehiclesService {
  constructor(@InjectModel(vehicleCollectionName) private vehicleModel: Model<Vehicle>) {}

  async create(values: IVehicle): Promise<IVehicle> {
    return await this.vehicleModel.create(values);
  }

  async update(id: string, values: Partial<IVehicle>): Promise<IVehicle> {
    const vehicle = await findOrThrow(id, () => this.vehicleModel.findById(id));

    Object.assign(vehicle, values);

    return await vehicle.save();
  }

  async findById(id: string): Promise<IVehicle> {
    return await findOrThrow(id, () => this.vehicleModel.findById(id));
  }

  async findAll(): Promise<IVehicle[]> {
    return await this.vehicleModel.find();
  }
}
