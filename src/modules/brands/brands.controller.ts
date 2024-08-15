import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './dtos';
import { IBrand } from '@app/interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  async create(@Body() data: CreateBrandDto): Promise<IBrand> {
    return this.brandsService.create(data);
  }

  @Get()
  async findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.brandsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateBrandDto) {
    return this.brandsService.update(id, data);
  }
}
