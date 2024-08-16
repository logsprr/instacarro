import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from '@app/schemas';
import { Model as MongooseModel, Types } from 'mongoose';
import { modelCollectionName } from '@app/modules/schemas';
import { defaultId, mockModelData } from '../../mocks';
import { IModel } from '@app/interfaces';
import { ModelsService } from '@app/modules/models';

describe('ModelsService', () => {
  let service: ModelsService;
  let model: MongooseModel<Model>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModelsService,
        {
          provide: getModelToken(modelCollectionName),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ModelsService>(ModelsService);
    model = module.get<MongooseModel<Model>>(getModelToken(modelCollectionName));
  });

  const modelData = {
    ...mockModelData,
    _id: new Types.ObjectId(defaultId),
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new model', async () => {
      jest.spyOn(model, 'create').mockResolvedValue(modelData as any);

      const result = await service.create(mockModelData);
      expect(result).toEqual(modelData);
      expect(model.create).toHaveBeenCalledWith(mockModelData);
    });
  });

  describe('update', () => {
    it('should update an model', async () => {
      const updated = { ...modelData, year: 2025 } as IModel;
      const modelDataById = { ...modelData, save: jest.fn().mockResolvedValue(updated) };

      jest.spyOn(model, 'findById').mockResolvedValue(modelDataById);

      const result = await service.update(defaultId, updated);
      expect(result).toEqual(updated);
      expect(modelDataById.save).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should find an model by id', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(modelData);

      const result = await service.findById(defaultId);
      expect(result).toEqual(modelData);
    });
  });

  describe('findAll', () => {
    it('should find all models', async () => {
      const models = [modelData];

      jest.spyOn(model, 'find').mockResolvedValue(models);

      const result = await service.findAll();
      expect(result).toEqual(models);
    });
  });
});
