import { RequestMethod } from '@nestjs/common';
import { Params as LoggerModuleParams } from 'nestjs-pino';
import { Options as PinoHttpOptions } from 'pino-http';

export function getLogLevel() {
  return process.env.CI ? 'info' : 'trace';
}

export function setupLogger(): LoggerModuleParams {
  const pinoHttp: PinoHttpOptions = {
    level: getLogLevel(),
    formatters: {
      level: label => ({ level: label }),
    },
    redact: ['req.headers.authorization'],

    serializers: {
      err(e) {
        return {
          type: e.type,
          message: e.message,
          stack: e.stack,
        };
      },
    },
  };

  pinoHttp.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: true,
      ignore: 'req,res,pid,hostname',
    },
  };

  return {
    pinoHttp,
    exclude: [
      {
        path: 'health',
        method: RequestMethod.ALL,
      },
      {
        path: 'gpt/conversations',
        method: RequestMethod.POST,
      },
    ],
  };
}
