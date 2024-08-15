import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
  @IsString()
  user: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  car: Types.ObjectId;
}
