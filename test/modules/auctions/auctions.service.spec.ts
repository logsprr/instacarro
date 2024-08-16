import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Auction } from '@app/schemas';
import { Model, Types } from 'mongoose';
import { ConflictException } from '@nestjs/common';
import { AuctionsService } from '@app/modules/auctions';
import { auctionCollectionName } from '@app/modules/schemas';
import { defaultId, mockAuctionData } from '../../mocks';
import { IAuction } from '@app/interfaces';

describe('AuctionsService', () => {
  let service: AuctionsService;
  let model: Model<Auction>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuctionsService,
        {
          provide: getModelToken(auctionCollectionName),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuctionsService>(AuctionsService);
    model = module.get<Model<Auction>>(getModelToken(auctionCollectionName));
  });

  const auction = {
    ...mockAuctionData,
    _id: new Types.ObjectId(defaultId),
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new auction', async () => {
      jest.spyOn(model, 'create').mockResolvedValue(auction as any);

      const result = await service.create(mockAuctionData);
      expect(result).toEqual(auction);
      expect(model.create).toHaveBeenCalledWith(mockAuctionData);
    });
  });

  describe('update', () => {
    it('should update an auction', async () => {
      const updated = { ...auction, lot: 15151615 } as IAuction;
      const auctionById = { ...auction, save: jest.fn().mockResolvedValue(updated) };

      jest.spyOn(model, 'findById').mockResolvedValue(auctionById);

      const result = await service.update(defaultId, updated);
      expect(result).toEqual(updated);
      expect(auctionById.save).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('should close an auction and set the bid winner', async () => {
      const updated = { ...auction, open: false, bidWinner: new Types.ObjectId(defaultId) };
      const auctionById = {
        ...auction,
        save: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(updated),
        }),
      };

      jest.spyOn(model, 'findById').mockReturnValue({
        populate: jest.fn().mockResolvedValue(auctionById),
      } as any);

      const result = await service.close(defaultId, { endDate: new Date() });
      expect(result).toEqual(updated);
      expect(auctionById.save).toHaveBeenCalled();
    });

    it('should throw ConflictException if auction is not open', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        populate: jest.fn().mockResolvedValue({ ...auction, open: false }),
      } as any);

      await expect(service.close(defaultId, { endDate: new Date() })).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException if date is less than 10 minutes', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        populate: jest.fn().mockResolvedValue(auction),
      } as any);

      await expect(
        service.close(defaultId, { endDate: new Date(Date.now() + 86400000) }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findById', () => {
    it('should find an auction by id', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(auction);

      const result = await service.findById(defaultId);
      expect(result).toEqual(auction);
    });
  });

  describe('findAll', () => {
    it('should find all auctions', async () => {
      const auctions = [auction];

      jest.spyOn(model, 'find').mockResolvedValue(auctions);

      const result = await service.findAll();
      expect(result).toEqual(auctions);
    });
  });

  describe('findAuctionByVehicleId', () => {
    it('should find auctions by vechicleId', async () => {
      const auctions = [
        {
          ...auction,
          _id: new Types.ObjectId(defaultId),
          vehicle: new Types.ObjectId(defaultId),
        },
      ];

      jest.spyOn(model, 'find').mockReturnValue({
        populate: jest.fn().mockResolvedValue(auctions),
      } as any);

      const result = await service.findAuctionByVehicleId(defaultId);
      expect(result).toEqual(auctions);
    });
  });
});
