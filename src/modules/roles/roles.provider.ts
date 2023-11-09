import { ROLES_REPOSITORY } from '../../core/constants';
import { RolesType } from '../roles-type/roles-type.entity';

export const rolesProviders = [
  {
    provide: ROLES_REPOSITORY,
    useValue: RolesType,
  },
];
