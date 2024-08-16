import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '@app/schemas';
import { Model, Types } from 'mongoose';
import { userCollectionName } from '@app/modules/schemas';
import { IUser } from '@app/interfaces';
import { UsersService } from '@app/modules/users';
import { CryptoService } from '@app/modules/crypto';
import { defaultId, mockAppConfig, mockUserData } from '../../mocks';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configs from '@app/config';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: configs,
          isGlobal: true,
        }),
      ],
      providers: [
        UsersService,
        CryptoService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(mockAppConfig),
          },
        },
        {
          provide: getModelToken(userCollectionName),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(userCollectionName));
  });

  const user = {
    ...mockUserData,
    _id: new Types.ObjectId(defaultId),
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      jest.spyOn(model, 'create').mockResolvedValue(user as any);

      const result = await service.create(mockUserData);
      expect(result).toEqual(user);
      expect(model.create).not.toHaveBeenCalledWith(mockUserData);
    });
  });

  describe('update', () => {
    it('should update an user', async () => {
      const updated = { ...user, name: 'Dev 2.0' } as IUser;
      const userById = { ...user, save: jest.fn().mockResolvedValue(updated) };

      jest.spyOn(model, 'findById').mockResolvedValue(userById);

      const result = await service.update(defaultId, updated);
      expect(result).toEqual(updated);
      expect(userById.save).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should find an user by id', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(user);

      const result = await service.findById(defaultId);
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      const users = [user];

      jest.spyOn(model, 'find').mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
    });
  });
});
