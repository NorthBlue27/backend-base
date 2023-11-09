import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { UserModule } from './modules/user/user.module';
import { RolesTypeModule } from './modules/roles-type/roles-type.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, DatabaseModule, UserModule, RolesTypeModule, RolesModule],
})
export class AppModule {}
