import { PartialType } from '@nestjs/swagger';
import { CreateRolesTypeDto } from './create-roles-type.dto';

export class UpdateRolesTypeDto extends PartialType(CreateRolesTypeDto) {}
