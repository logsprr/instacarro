import { registerAs } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const loadDbConfig = (): MongooseModuleFactoryOptions => ({
  uri: process.env.MONGO_DB_URI,
  dbName: process.env.MONGO_DB_NAME,
});

export default registerAs('db', loadDbConfig);
