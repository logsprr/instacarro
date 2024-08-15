import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';

import { AuthService } from './auth.service';

@Injectable()
export class AuthBasicStrategy extends PassportStrategy(Strategy, 'auth-basic') {
  private readonly log = new Logger('AuthBasicStrategy');

  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(request: Request) {
    const isValidToken = this.authService.checkToken(request.headers.authorization as string);

    if (!isValidToken) {
      this.log.error('Token is not valid for the url %s', request.url);
      throw new UnauthorizedException('Token is not valid to access the server');
    }

    return true;
  }
}
