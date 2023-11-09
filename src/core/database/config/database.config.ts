import { DatabaseInterface } from '../interfaces/database.interface';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: DatabaseInterface = {
  development: {
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_DEV,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
  },
  test: {
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_TEST,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
  },
  production: {
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST,
  },
};
