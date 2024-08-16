import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Photo } from '@app/schemas';
import { Model, Types } from 'mongoose';
import { PhotosService } from '@app/modules/photos';
import { photoCollectionName } from '@app/modules/schemas';
import { defaultId, mockPhotoData } from '../../mocks';
import { IPhoto } from '@app/interfaces';

describe('PhotosService', () => {
  let service: PhotosService;
  let model: Model<Photo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhotosService,
        {
          provide: getModelToken(photoCollectionName),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PhotosService>(PhotosService);
    model = module.get<Model<Photo>>(getModelToken(photoCollectionName));
  });

  const photo = {
    ...mockPhotoData,
    _id: new Types.ObjectId(defaultId),
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new photo', async () => {
      jest.spyOn(model, 'create').mockResolvedValue(photo as any);

      const result = await service.create(mockPhotoData);
      expect(result).toEqual(photo);
      expect(model.create).toHaveBeenCalledWith(mockPhotoData);
    });
  });

  describe('update', () => {
    it('should update an photo', async () => {
      const updated = { ...photo, details: [] } as IPhoto;
      const photoById = { ...photo, save: jest.fn().mockResolvedValue(updated) };

      jest.spyOn(model, 'findById').mockResolvedValue(photoById);

      const result = await service.update(defaultId, updated);
      expect(result).toEqual(updated);
      expect(photoById.save).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should find an photo by id', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(photo);

      const result = await service.findById(defaultId);
      expect(result).toEqual(photo);
    });
  });

  describe('findAll', () => {
    it('should find all photos', async () => {
      const photos = [photo];

      jest.spyOn(model, 'find').mockResolvedValue(photos);

      const result = await service.findAll();
      expect(result).toEqual(photos);
    });
  });
});
