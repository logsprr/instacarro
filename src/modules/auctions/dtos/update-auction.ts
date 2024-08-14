import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';

export class UpdateAuctionDto {
  @IsOptional()
  @IsNumber()
  minPrice: number;

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsNumber()
  lot: number;

  @IsOptional()
  @IsBoolean()
  open: boolean;
}
