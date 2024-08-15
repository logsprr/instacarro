import { IsArray, IsNotEmpty, IsString } from 'class-validator';
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
  @IsString()
  user: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  car: Types.ObjectId;
}
