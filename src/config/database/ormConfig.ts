import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/typeorm/entities/User';
import { Task } from 'src/typeorm/entities/Task';
import { Branch } from 'src/typeorm/entities/Branch';
import { User_project } from 'src/typeorm/entities/User_project';
import { Project } from 'src/typeorm/entities/Project';
import { Client } from 'src/typeorm/entities/Client';
import { Timesheet } from 'src/typeorm/entities/Timesheet';
dotenv.config();
export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DATABASE_CONNECTION as 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB_NAME,
  entities: [User, Task, Branch, User_project, Project, Client, Timesheet],
  migrations: ['dist/config/database/migrations/*{.ts,.js}'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
