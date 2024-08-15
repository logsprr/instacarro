import { ToObjectId } from '@app/util';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBidDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @ToObjectId()
  user: Types.ObjectId;

  @IsNotEmpty()
  @ToObjectId()
  auction: Types.ObjectId;
}
