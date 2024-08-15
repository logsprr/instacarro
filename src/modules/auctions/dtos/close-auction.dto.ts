import { IsDate, IsNotEmpty } from 'class-validator';

export class CloseAuctionDto {
  @IsNotEmpty()
  @IsDate()
  endDate: Date;
}
