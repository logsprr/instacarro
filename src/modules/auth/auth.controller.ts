import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: LoginDto): Promise<string> {
    const token = await this.authService.login(email, password);

    if (!token) {
      throw new BadRequestException('No token is generated for the email provided');
    }

    return token;
  }
}
