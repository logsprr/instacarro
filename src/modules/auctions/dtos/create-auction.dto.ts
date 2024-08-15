import { ToObjectId } from '@app/util/dto';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAuctionDto {
  @IsNotEmpty()
  @IsNumber()
  minPrice: number;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  lot: number;

  @IsNotEmpty()
  @IsBoolean()
  open: boolean;

  @IsNotEmpty()
  @ToObjectId()
  car: Types.ObjectId;

  @IsNotEmpty()
  @ToObjectId()
  user: Types.ObjectId;
}
