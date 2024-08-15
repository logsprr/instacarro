import { ToObjectId } from '@app/util';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { Types } from 'mongoose';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  licensePlate: string;

  @IsNotEmpty()
  @IsNumber()
  mileage: number;

  @IsNotEmpty()
  @IsString()
  condition: string;

  @IsOptional()
  @IsString()
  details?: string;

  @IsNotEmpty()
  @ToObjectId()
  model: Types.ObjectId;

  @IsNotEmpty()
  @ToObjectId()
  user: Types.ObjectId;
}
