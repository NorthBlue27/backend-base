import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { userProviders } from '../user/user.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategie';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ...userProviders],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    ConfigModule,
  ],
  exports: [JwtModule, PassportModule, AuthModule, JwtModule],
})
export class AuthModule {}
