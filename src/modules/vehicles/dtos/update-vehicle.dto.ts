import { ToObjectId } from '@app/util';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { Types } from 'mongoose';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  licensePlate: string;

  @IsOptional()
  @IsNumber()
  mileage: number;

  @IsOptional()
  @IsString()
  condition: string;

  @IsOptional()
  @IsString()
  details?: string;

  @IsOptional()
  @ToObjectId()
  model: Types.ObjectId;
}
