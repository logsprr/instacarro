import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dtos';
import { ICar } from '@app/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('cars')
@Controller('cars')
@UseGuards(AuthGuard())
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async create(@Body() data: CreateCarDto): Promise<ICar> {
    return this.carsService.create(data);
  }

  @Get()
  async findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.carsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCarDto) {
    return this.carsService.update(id, data);
  }
}
