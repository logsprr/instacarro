import { registerAs } from '@nestjs/config';

export interface ServerConfig {
  port: number;
  keepAliveTimeout: number;
  env: string;
  authSecretKey: string;
}

export const loadAppConfig = (): ServerConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  keepAliveTimeout: parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10) || 100000,
  env: process.env.NODE_ENV,
  authSecretKey: process.env.AUTH_SECRET_KEY,
});

export default registerAs('env', loadAppConfig);
