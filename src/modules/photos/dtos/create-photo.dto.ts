import { ToObjectId } from '@app/util';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePhotoDto {
  @IsArray()
  external: string[];

  @IsArray()
  internal: string[];

  @IsArray()
  engine: string[];

  @IsArray()
  details: string[];

  @IsNotEmpty()
  @ToObjectId()
  user: Types.ObjectId;

  @IsNotEmpty()
  @ToObjectId()
  car: Types.ObjectId;
}
