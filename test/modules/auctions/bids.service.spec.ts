import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Auction, Bid } from '@app/schemas';
import { Model, Types } from 'mongoose';
import { ConflictException } from '@nestjs/common';
import { BidsService } from '@app/modules/bids';
import { auctionCollectionName, bidCollectionName } from '@app/modules/schemas';
import { defaultId, mockAuctionData, mockBidData } from '../../mocks';
import { AuctionsService } from '@app/modules/auctions';

describe('BidsService', () => {
  let service: BidsService;
  let model: Model<Bid>;
  let auctionModel: Model<Auction>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BidsService,
        AuctionsService,
        {
          provide: getModelToken(bidCollectionName),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getModelToken(auctionCollectionName),
          useValue: { findById: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<BidsService>(BidsService);
    model = module.get<Model<Bid>>(getModelToken(bidCollectionName));
    auctionModel = module.get<Model<Auction>>(getModelToken(auctionCollectionName));
  });

  const bid = {
    ...mockBidData,
    _id: new Types.ObjectId(defaultId),
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new bid', async () => {
      jest.spyOn(auctionModel, 'findById').mockResolvedValue(mockAuctionData);

      jest.spyOn(model, 'create').mockResolvedValue(bid as any);

      const result = await service.create(mockBidData);
      expect(result).toEqual(bid);
      expect(model.create).toHaveBeenCalledWith(mockBidData);
    });

    it('should throw ConflictException if auction is not open', async () => {
      jest.spyOn(auctionModel, 'findById').mockResolvedValue({ ...mockAuctionData, open: false });

      await expect(service.create(mockBidData)).rejects.toThrow(ConflictException);
    });
  });

  describe('findById', () => {
    it('should find an bid by id', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(bid);

      const result = await service.findById(defaultId);
      expect(result).toEqual(bid);
    });
  });

  describe('findAll', () => {
    it('should find all bids', async () => {
      const bids = [bid];

      jest.spyOn(model, 'find').mockResolvedValue(bids);

      const result = await service.findAll();
      expect(result).toEqual(bids);
    });
  });
});
