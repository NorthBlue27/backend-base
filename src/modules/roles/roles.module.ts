import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { UserModule } from '../user/user.module';
import { RolesTypeModule } from '../roles-type/roles-type.module';
import { rolesProviders } from './roles.provider';

@Module({
  controllers: [RolesController],
  providers: [RolesService, ...rolesProviders],
  imports: [UserModule, RolesTypeModule],
})
export class RolesModule {}
