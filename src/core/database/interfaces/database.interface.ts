export interface DatabaseInterface {
  development: ConfigDB;
  test: ConfigDB;
  production: ConfigDB;
}

interface ConfigDB {
  dialect: string;
  username: string;
  password: string;
  database: string;
  host: string;
  port?: number;
}
