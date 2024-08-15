import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dtos';
import { IBid } from '@app/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('bids')
@Controller('bids')
@UseGuards(AuthGuard())
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
