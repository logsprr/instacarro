import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Vehicle } from '@app/schemas';
import { Model, Types } from 'mongoose';
import { VehiclesService } from '@app/modules/vehicles';
import { vehicleCollectionName } from '@app/modules/schemas';
import { IVehicle } from '@app/interfaces';
import { defaultId, mockVehicleData } from '../../mocks';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let model: Model<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: getModelToken(vehicleCollectionName),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    model = module.get<Model<Vehicle>>(getModelToken(vehicleCollectionName));
  });

  const vehicle = {
    ...mockVehicleData,
    _id: new Types.ObjectId(defaultId),
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new vehicle', async () => {
      jest.spyOn(model, 'create').mockResolvedValue(vehicle as any);

      const result = await service.create(mockVehicleData);
      expect(result).toEqual(vehicle);
      expect(model.create).toHaveBeenCalledWith(mockVehicleData);
    });
  });

  describe('update', () => {
    it('should update an vehicle', async () => {
      const updated = { ...vehicle, color: 'Red' } as IVehicle;
      const vechicleById = { ...vehicle, save: jest.fn().mockResolvedValue(updated) };

      jest.spyOn(model, 'findById').mockResolvedValue(vechicleById);

      const result = await service.update(defaultId, updated);
      expect(result).toEqual(updated);
      expect(vechicleById.save).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should find an vehicle by id', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(vehicle);

      const result = await service.findById(defaultId);
      expect(result).toEqual(vehicle);
    });
  });

  describe('findAll', () => {
    it('should find all vehicles', async () => {
      const vehicles = [vehicle];

      jest.spyOn(model, 'find').mockResolvedValue(vehicles);

      const result = await service.findAll();
      expect(result).toEqual(vehicles);
    });
  });
});
