import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthBasicStrategy } from './auth.strategy';
import { UsersModule } from '@app/modules/users';
import { CryptoModule } from '@app/modules/crypto';

const passportModule = PassportModule.register({ defaultStrategy: 'auth-basic' });

@Global()
@Module({
  imports: [passportModule, CryptoModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AuthBasicStrategy],
  exports: [passportModule, AuthService],
})
export class AuthModule {}
