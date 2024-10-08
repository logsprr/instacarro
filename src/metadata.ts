/* eslint-disable */
export default async () => {
  const t = {};
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./modules/users/dtos/create-user.dto'),
          {
            CreateUserDto: {
              name: { required: true, type: () => String },
              password: { required: true, type: () => String },
              cpf: { required: true, type: () => String },
              email: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./modules/users/dtos/update-user.dto'),
          { UpdateUserDto: { name: { required: true, type: () => String } } },
        ],
        [
          import('./modules/auctions/dtos/close-auction.dto'),
          { CloseAuctionDto: { endDate: { required: true, type: () => Date } } },
        ],
        [
          import('./modules/auctions/dtos/create-auction.dto'),
          {
            CreateAuctionDto: {
              minPrice: { required: true, type: () => Number },
              startDate: { required: true, type: () => Date },
              endDate: { required: true, type: () => Date },
              lot: { required: true, type: () => Number },
              open: { required: true, type: () => Boolean },
              vehicle: { required: true, type: () => require('mongoose').Types.ObjectId },
              user: { required: true, type: () => require('mongoose').Types.ObjectId },
            },
          },
        ],
        [
          import('./modules/auctions/dtos/update-auction.dto'),
          {
            UpdateAuctionDto: {
              minPrice: { required: true, type: () => Number },
              startDate: { required: true, type: () => Date },
              endDate: { required: true, type: () => Date },
              lot: { required: true, type: () => Number },
              open: { required: true, type: () => Boolean },
            },
          },
        ],
        [
          import('./modules/bids/dtos/create-bid.dto'),
          {
            CreateBidDto: {
              amount: { required: true, type: () => Number },
              user: { required: true, type: () => require('mongoose').Types.ObjectId },
              auction: { required: true, type: () => require('mongoose').Types.ObjectId },
            },
          },
        ],
        [
          import('./modules/brands/dtos/create-brand.dto'),
          {
            CreateBrandDto: {
              name: { required: true, type: () => String },
              country: { required: true, type: () => String },
              description: { required: false, type: () => String },
              user: { required: true, type: () => require('mongoose').Types.ObjectId },
            },
          },
        ],
        [
          import('./modules/brands/dtos/update-brand.dto'),
          {
            UpdateBrandDto: {
              name: { required: true, type: () => String },
              country: { required: true, type: () => String },
              description: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./modules/models/dtos/create-model.dto'),
          {
            CreateModelDto: {
              name: { required: true, type: () => String },
              year: { required: true, type: () => Number },
              engineType: { required: true, type: () => String },
              fuelType: { required: true, type: () => String },
              transmission: { required: true, type: () => String },
              brand: { required: true, type: () => require('mongoose').Types.ObjectId },
              user: { required: true, type: () => require('mongoose').Types.ObjectId },
            },
          },
        ],
        [
          import('./modules/models/dtos/update-model.dto'),
          {
            UpdateModelDto: {
              name: { required: true, type: () => String },
              year: { required: true, type: () => Number },
              engineType: { required: true, type: () => String },
              fuelType: { required: true, type: () => String },
              transmission: { required: true, type: () => String },
              brand: { required: true, type: () => require('mongoose').Types.ObjectId },
            },
          },
        ],
        [
          import('./modules/photos/dtos/create-photo.dto'),
          {
            CreatePhotoDto: {
              external: { required: true, type: () => [String] },
              internal: { required: true, type: () => [String] },
              engine: { required: true, type: () => [String] },
              details: { required: true, type: () => [String] },
              user: { required: true, type: () => require('mongoose').Types.ObjectId },
              vehicle: { required: true, type: () => require('mongoose').Types.ObjectId },
            },
          },
        ],
        [
          import('./modules/photos/dtos/update-photo.dto'),
          {
            UpdatePhotoDto: {
              external: { required: true, type: () => [String] },
              internal: { required: true, type: () => [String] },
              engine: { required: true, type: () => [String] },
              details: { required: true, type: () => [String] },
            },
          },
        ],
        [
          import('./modules/auth/dtos/login.dto'),
          {
            LoginDto: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./modules/vehicles/dtos/create-vehicle.dto'),
          {
            CreateVehicleDto: {
              color: { required: true, type: () => String },
              licensePlate: { required: true, type: () => String },
              mileage: { required: true, type: () => Number },
              condition: { required: true, type: () => String },
              details: { required: false, type: () => String },
              model: { required: true, type: () => require('mongoose').Types.ObjectId },
              user: { required: true, type: () => require('mongoose').Types.ObjectId },
            },
          },
        ],
        [
          import('./modules/vehicles/dtos/update-vehicle.dto'),
          {
            UpdateVehicleDto: {
              color: { required: true, type: () => String },
              licensePlate: { required: true, type: () => String },
              mileage: { required: true, type: () => Number },
              condition: { required: true, type: () => String },
              details: { required: false, type: () => String },
              model: { required: true, type: () => require('mongoose').Types.ObjectId },
            },
          },
        ],
      ],
      controllers: [
        [
          import('./modules/users/users.controller'),
          {
            UsersController: {
              create: { type: Object },
              findAll: { type: [Object] },
              findOne: { type: Object },
              update: { type: Object },
            },
          },
        ],
        [
          import('./modules/auctions/auctions.controller'),
          {
            AuctionsController: {
              create: { type: Object },
              findAll: { type: [Object] },
              findBids: { type: [Object] },
              findOne: { type: Object },
              close: { type: Object },
              update: { type: Object },
            },
          },
        ],
        [
          import('./modules/bids/bids.controller'),
          {
            BidsController: {
              create: { type: Object },
              findAll: { type: [Object] },
              findOne: { type: Object },
            },
          },
        ],
        [
          import('./modules/brands/brands.controller'),
          {
            BrandsController: {
              create: { type: Object },
              findAll: { type: [Object] },
              findOne: { type: Object },
              update: { type: Object },
            },
          },
        ],
        [
          import('./modules/models/models.controller'),
          {
            ModelsController: {
              create: { type: Object },
              findAll: { type: [Object] },
              findOne: { type: Object },
              update: { type: Object },
            },
          },
        ],
        [
          import('./modules/photos/photos.controller'),
          {
            PhotosController: {
              create: { type: Object },
              findAll: { type: [Object] },
              findOne: { type: Object },
              update: { type: Object },
            },
          },
        ],
        [import('./modules/auth/auth.controller'), { AuthController: { login: { type: String } } }],
        [
          import('./modules/vehicles/vehicles.controller'),
          {
            VehiclesController: {
              create: { type: Object },
              findAll: { type: [Object] },
              findOne: { type: Object },
              update: { type: Object },
            },
          },
        ],
      ],
    },
  };
};
