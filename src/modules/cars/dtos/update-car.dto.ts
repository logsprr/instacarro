import { IsNumber, IsOptional, IsString } from 'class-validator';

import { Types } from 'mongoose';

export class UpdateCarDto {
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
  @IsString()
  model: Types.ObjectId;
}
