import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBidDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  user: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  car: Types.ObjectId;
}
