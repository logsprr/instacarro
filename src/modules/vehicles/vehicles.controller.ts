import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dtos';
import { IVehicle } from '@app/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('vehicles')
@Controller('vehicles')
@UseGuards(AuthGuard())
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async create(@Body() data: CreateVehicleDto): Promise<IVehicle> {
    return this.vehiclesService.create(data);
  }

  @Get()
  async findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vehiclesService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateVehicleDto) {
    return this.vehiclesService.update(id, data);
  }
}
