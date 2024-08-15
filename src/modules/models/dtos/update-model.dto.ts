import { ToObjectId } from '@app/util/dto';
import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateModelDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  engineType: string;

  @IsOptional()
  @IsString()
  fuelType: string;

  @IsOptional()
  @IsString()
  transmission: string;

  @IsOptional()
  @ToObjectId()
  brand: Types.ObjectId;
}
