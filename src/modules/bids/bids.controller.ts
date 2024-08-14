import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dtos';
import { IBid } from '@app/interfaces';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post()
  async create(@Body() data: CreateBidDto): Promise<IBid> {
    return this.bidsService.create(data);
  }

  @Get()
  async findAll() {
    return this.bidsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bidsService.findById(id);
  }
}
