import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '@app/schemas';
import { Model, Types } from 'mongoose';
import { userCollectionName } from '@app/modules/schemas';
import { AuthService } from '@app/modules/auth';
import { CryptoService } from '@app/modules/crypto';
import { checkToken, defaultId, mockAppConfig, mockUserData } from '../../mocks';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configs from '@app/config';
import { UsersService } from '@app/modules/users';
import { NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let cryptoService: CryptoService;
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
        AuthService,
        CryptoService,
        UsersService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(mockAppConfig),
          },
        },
        {
          provide: getModelToken(userCollectionName),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    cryptoService = module.get<CryptoService>(CryptoService);
    model = module.get<Model<User>>(getModelToken(userCollectionName));
  });

  const user = {
    ...mockUserData,
    password: 'c078e78bf154878de8b9f351fb2c4351:a9aa5fbb4649847acf7e61f838386244',
    _id: new Types.ObjectId(defaultId),
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return token', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(user),
      } as any);

      const result = await service.login(user.email, '123456');
      expect(checkToken(result)).toBe(true);
    });

    it('should not return user', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.login(user.email, '123456')).rejects.toThrow(NotFoundException);
    });

    it('should not return token due wrong password', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(user),
      } as any);

      const result = await service.login(user.email, '1234566');
      expect(result).toBeNull();
    });
  });

  describe('token', () => {
    it('should generate token', async () => {
      const result = service.generateToken(defaultId);
      expect(checkToken(result)).toBe(true);
    });

    it('should token be valid', async () => {
      const token = service.generateToken(defaultId);
      const result = service.checkToken(token);
      expect(result).toBe(true);
    });

    it('should token be invalid', async () => {
      const token = service.generateToken(defaultId);
      const result = service.checkToken(token + '15645656456454');
      expect(result).toBe(false);
    });

    it('should crypto service encrypt and decrypt', async () => {
      const token = service.generateToken(defaultId);
      const result = service.checkToken(token);
      expect(result).toBe(true);
    });
  });

  describe('crypto', () => {
    it('should encrypt and decrypt', async () => {
      const encrypted = cryptoService.encrypt('123456');
      const decrypted = cryptoService.decrypt(encrypted);
      expect('123456').toEqual(decrypted);
      expect(encrypted).not.toEqual(decrypted);
    });
  });
});
