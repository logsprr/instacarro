import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto, UpdateModelDto } from './dtos';
import { IModel } from '@app/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('models')
@Controller('models')
@UseGuards(AuthGuard())
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Post()
  async create(@Body() data: CreateModelDto): Promise<IModel> {
    return this.modelsService.create(data);
  }

  @Get()
  async findAll() {
    return this.modelsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.modelsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateModelDto) {
    return this.modelsService.update(id, data);
  }
}
