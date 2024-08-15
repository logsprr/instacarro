import { ToObjectId } from '@app/util/dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateModelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  engineType: string;

  @IsNotEmpty()
  @IsString()
  fuelType: string;

  @IsNotEmpty()
  @IsString()
  transmission: string;

  @IsNotEmpty()
  @ToObjectId()
  brand: Types.ObjectId;

  @IsNotEmpty()
  @ToObjectId()
  user: Types.ObjectId;
}
