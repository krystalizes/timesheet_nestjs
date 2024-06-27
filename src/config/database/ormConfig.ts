import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DATABASE_CONNECTION as 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB_NAME,
  entities: ['dist/typeorm/entities/*{.ts,.js}'],
  migrations: ['dist/config/database/migrations/*{.ts,.js}'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
