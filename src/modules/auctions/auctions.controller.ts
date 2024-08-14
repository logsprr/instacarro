import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto, UpdateAuctionDto } from './dtos';
import { IAuction } from '@app/interfaces';

@Controller('auctions')
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.auctionsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateAuctionDto) {
    return this.auctionsService.update(id, data);
  }
}
