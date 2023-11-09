import { Sequelize } from 'sequelize-typescript';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '../constants';
import { databaseConfig } from './config/database.config';
import { User } from '../../modules/user/user.entity';
import { RolesType } from 'src/modules/roles-type/roles-type.entity';
import { Roles } from '../../modules/roles/roles.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config: Object;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize({
        ...config,
        define: {
          freezeTableName: true,
        },
      });
      sequelize.addModels([User, RolesType, Roles]);
      return sequelize;
    },
  },
];
