import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto, UpdatePhotoDto } from './dtos';
import { IPhoto } from '@app/interfaces';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  async create(@Body() data: CreatePhotoDto): Promise<IPhoto> {
    return this.photosService.create(data);
  }

  @Get()
  async findAll() {
    return this.photosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.photosService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePhotoDto) {
    return this.photosService.update(id, data);
  }
}
