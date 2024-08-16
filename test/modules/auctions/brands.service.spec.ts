import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Brand } from '@app/schemas';
import { Model, Types } from 'mongoose';
import { BrandsService } from '@app/modules/brands';
import { brandCollectionName } from '@app/modules/schemas';
import { defaultId, mockBrandData } from '../../mocks';
import { IBrand } from '@app/interfaces';

describe('BrandsService', () => {
  let service: BrandsService;
  let model: Model<Brand>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getModelToken(brandCollectionName),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    model = module.get<Model<Brand>>(getModelToken(brandCollectionName));
  });

  const brand = {
    ...mockBrandData,
    _id: new Types.ObjectId(defaultId),
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new brand', async () => {
      jest.spyOn(model, 'create').mockResolvedValue(brand as any);

      const result = await service.create(mockBrandData);
      expect(result).toEqual(brand);
      expect(model.create).toHaveBeenCalledWith(mockBrandData);
    });
  });

  describe('update', () => {
    it('should update an brand', async () => {
      const updated = { ...brand, country: 'German' } as IBrand;
      const brandById = { ...brand, save: jest.fn().mockResolvedValue(updated) };

      jest.spyOn(model, 'findById').mockResolvedValue(brandById);

      const result = await service.update(defaultId, updated);
      expect(result).toEqual(updated);
      expect(brandById.save).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should find an brand by id', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(brand);

      const result = await service.findById(defaultId);
      expect(result).toEqual(brand);
    });
  });

  describe('findAll', () => {
    it('should find all brands', async () => {
      const brands = [brand];

      jest.spyOn(model, 'find').mockResolvedValue(brands);

      const result = await service.findAll();
      expect(result).toEqual(brands);
    });
  });
});
