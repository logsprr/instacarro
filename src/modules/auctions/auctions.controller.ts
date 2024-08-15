import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CloseAuctionDto, CreateAuctionDto, UpdateAuctionDto } from './dtos';
import { IAuction } from '@app/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auctions')
@Controller('auctions')
@UseGuards(AuthGuard())
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Post()
  async create(@Body() data: CreateAuctionDto): Promise<IAuction> {
    return this.auctionsService.create(data);
  }

  @Get()
  async findAll() {
    return this.auctionsService.findAll();
  }

  @Get('by-car/:carId/bids')
  async findBids(@Param('carId') carId: string) {
    return this.auctionsService.findAuctionByCarId(carId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.auctionsService.findById(id);
  }

  @Patch(':id/close')
  async close(@Param('id') id: string, @Body() data: CloseAuctionDto) {
    return this.auctionsService.close(id, data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateAuctionDto) {
    return this.auctionsService.update(id, data);
  }
}
