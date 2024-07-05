import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Branch } from 'src/typeorm/entities/Branch';
import { Client } from 'src/typeorm/entities/Client';
import { Project } from 'src/typeorm/entities/Project';
import { Task } from 'src/typeorm/entities/Task';
import { Timesheet } from 'src/typeorm/entities/Timesheet';
import { User } from 'src/typeorm/entities/User';
import { User_project } from 'src/typeorm/entities/User_project';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    if (this.configService.get<string>('NODE_ENV') === 'development') {
      return {
        type: process.env.DATABASE_CONNECTION as 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB_NAME,
        entities: [
          User,
          Branch,
          Client,
          User_project,
          Project,
          Task,
          Timesheet,
        ],
        synchronize: process.env.SYNCHRONIZE === 'true',
        migrations: ['dist/config/database/migrations/*{.ts,.js}'],
      };
    }
    if (this.configService.get<string>('NODE_ENV') === 'test') {
      return {
        type: process.env.DATABASE_CONNECTION as 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB_NAME,
        entities: [
          User,
          Branch,
          Client,
          User_project,
          Project,
          Task,
          Timesheet,
        ],
        synchronize: process.env.SYNCHRONIZE === 'true',
        migrations: ['dist/config/database/migrations/*{.ts,.js}'],
      };
    }
  }
}
