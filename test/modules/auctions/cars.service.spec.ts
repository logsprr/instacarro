import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Car } from '@app/schemas';
import { Model, Types } from 'mongoose';
import { CarsService } from '@app/modules/cars';
import { carCollectionName } from '@app/modules/schemas';
import { ICar } from '@app/interfaces';
import { defaultId, mockCarData } from '../../mocks';

describe('CarsService', () => {
  let service: CarsService;
  let model: Model<Car>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: getModelToken(carCollectionName),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
    model = module.get<Model<Car>>(getModelToken(carCollectionName));
  });

  const car = {
    ...mockCarData,
    _id: new Types.ObjectId(defaultId),
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new car', async () => {
      jest.spyOn(model, 'create').mockResolvedValue(car as any);

      const result = await service.create(mockCarData);
      expect(result).toEqual(car);
      expect(model.create).toHaveBeenCalledWith(mockCarData);
    });
  });

  describe('update', () => {
    it('should update an car', async () => {
      const updated = { ...car, color: 'Red' } as ICar;
      const carById = { ...car, save: jest.fn().mockResolvedValue(updated) };

      jest.spyOn(model, 'findById').mockResolvedValue(carById);

      const result = await service.update(defaultId, updated);
      expect(result).toEqual(updated);
      expect(carById.save).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should find an car by id', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(car);

      const result = await service.findById(defaultId);
      expect(result).toEqual(car);
    });
  });

  describe('findAll', () => {
    it('should find all cars', async () => {
      const cars = [car];

      jest.spyOn(model, 'find').mockResolvedValue(cars);

      const result = await service.findAll();
      expect(result).toEqual(cars);
    });
  });
});
