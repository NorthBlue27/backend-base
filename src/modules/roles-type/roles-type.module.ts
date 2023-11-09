import { Module } from '@nestjs/common';
import { RolesTypeService } from './services/roles-type.service';
import { RolesTypeController } from './controllers/roles-type.controller';
import { rolesTypeProviders } from './roles-type.provider';

@Module({
  controllers: [RolesTypeController],
  providers: [RolesTypeService, ...rolesTypeProviders],
  exports: [RolesTypeService],
})
export class RolesTypeModule {}
