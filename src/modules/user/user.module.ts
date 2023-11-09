import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { userProviders } from './user.provider';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  imports: [AuthModule],
  exports: [UserService],
})
export class UserModule {}
