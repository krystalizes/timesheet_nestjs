import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
import { User } from 'src/typeorm/entities/User';
import { Branch } from 'src/typeorm/entities/Branch';
import { Client } from 'src/typeorm/entities/Client';
import { User_project } from 'src/typeorm/entities/User_project';
import { Project } from 'src/typeorm/entities/Project';
import { Task } from 'src/typeorm/entities/Task';
import { Timesheet } from 'src/typeorm/entities/Timesheet';
export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DATABASE_CONNECTION as 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB_NAME,
  entities: [User, Branch, Client, User_project, Project, Task, Timesheet],
  migrations: ['dist/config/database/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
