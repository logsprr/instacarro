import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import * as jwt from 'jsonwebtoken';

import appConfig from '@app/config/app';
import { UsersService } from '@app/modules/users';
import { CryptoService } from '@app/modules/crypto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(appConfig.KEY)
    private config: ConfigType<typeof appConfig>,

    private readonly cryptoService: CryptoService,
    private readonly usersService: UsersService,
  ) {}

  checkToken(token: string) {
    try {
      jwt.verify(token, this.config.authSecretKey);
    } catch (error) {
      return false;
    }

    return true;
  }

  generateToken(userId: string) {
    const payload = {
      userId,
    };
    return jwt.sign(payload, this.config.authSecretKey, { expiresIn: '4h' });
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    const userPassword = this.cryptoService.decrypt(user.password);

    if (userPassword !== password) {
      return null;
    }

    return this.generateToken(user.id);
  }
}
