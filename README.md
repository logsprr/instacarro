# InstaCarro

## Overview

This application provides functionalities to start an auction of vehicles. Below is a guide to get you started with the application, including steps for creating users, logging in, and managing various entities.

## Getting Started

### Prerequisites

- [Node.js (>=20.x)](https://nodejs.org/)
- [MongoDB (>=7.x)](https://www.mongodb.com/)
- [NestJS](https://nodejs.org/)
- [Pnpm (>= 9.7.x)](https://pnpm.io/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/logsprr/instacarro.git
   cd instacarro

### Running

1. **Install dependencies**
   ```bash
   pnpm install
2. **Do first build**
   ```bash
   pnpm run build
3. **Check metadata file** (if not generates run the command)
   ```bash
   pnpm run prebuild
4. **Create your .env file**
   ```bash
   MONGO_DB_URI=
   MONGO_DB_NAME=
   AUTH_SECRET_KEY=
   PORT=
5. **Run application**
   ```bash
   pnpm run start:dev

### Docs   

1. **To access swagger** (replace 3000 to your predefined port on .env)
   ```bash
   go to http://localhost:3000/api/docs

### Using   

1. **User creation**
   ```bash
   POST /api/users (no-auth)

   Request Body:

   {
    "name": "exampleUser",
    "password": "examplePassword",
    "email": "user@example.com",
    "cpf": "42285188005"
   }
2. **User login**
   ```bash
   POST /api/auth/login (no-auth)

   Request Body:

   {
    "password": "examplePassword",
    "email": "user@example.com",
   }
3. **Brand creation**
   ```bash
   POST /api/brands (auth-required (Use token from login on authorization headers))

   Request Body:

   {
    "name":"Royal Enfield",
    "country":"Brazil",
    "description": "A good brand",
    "user": "pass the id from user creation"
   }
4. **Model creation**
   ```bash
   POST /api/models (auth-required (Use token from login on authorization headers))

   Request Body:

   {
    "name":"Meteor Classic",
    "year":"2022",
    "engineType": "V2",
    "fuelType": "gas",
    "transmission": "6V",
    "brand": "pass the id from brand creation",
    "user": "pass the id from user creation"
   }
5. **Vehicle creation**
   ```bash
   POST /api/vehicles (auth-required (Use token from login on authorization headers))

   Request Body:

   {
    "name":"Meteor Classic",
    "year":"2022",
    "engineType": "V2",
    "fuelType": "gas",
    "transmission": "6V",
    "brand": "pass the id from brand creation",
    "user": "pass the id from user creation"
   }
6. **Auction creation**
   ```bash
   POST /api/auctions (auth-required (Use token from login on authorization headers))

   Request Body:

   {
    "minPrice":"1500",
    "startDate":"2024-08-15 18:30:00",
    "endDate": "2024-08-15 19:30:00",
    "lot": "1641131321",
    "open": true,
    "vehicle": "pass the id from vehicle creation",
    "user": "pass the id from user creation"
   }
7. **Bid creation**
   ```bash
   POST /api/bids (auth-required (Use token from login on authorization headers))

   Request Body:

   {
    "amount":"1600",
    "auction": "pass the id from auction creation",
    "user": "pass the id from user creation",
   }
8. **List Bids by auction using car id**
   ```bash
   GET /api/auctions/by-car/replace with car id from car creation/bids (auth-required (Use token from login on authorization headers))
9. **Close an auction**
   ```bash
   POST /api/auctions/replace with auction id from auction creation (auth-required (Use token from login on authorization headers))

   Request Body:

   {
    "endDate": "2024-08-15 19:55:00"
   }