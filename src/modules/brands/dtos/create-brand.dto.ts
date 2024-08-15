import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ToObjectId } from '@app/util';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @ToObjectId()
  user: Types.ObjectId;
}
