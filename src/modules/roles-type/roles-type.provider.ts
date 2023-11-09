import { ROLES_TYPE_REPOSITORY } from '../../core/constants/index';
import { RolesType } from './roles-type.entity';

export const rolesTypeProviders = [
  {
    provide: ROLES_TYPE_REPOSITORY,
    useValue: RolesType,
  },
];
