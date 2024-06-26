// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/database.config';
import { UserModule } from './module/user/user.module';
import { User } from './typeorm/entities/User';
import { Branch } from './typeorm/entities/Branch';
import { Client } from './typeorm/entities/Client';
import { Project } from './typeorm/entities/Project';
import { Task } from './typeorm/entities/Task';
import { Timesheet } from './typeorm/entities/Timesheet';
import { User_project } from './typeorm/entities/User_project';
import { ClientModule } from './module/client/client.module';
import { ProjectModule } from './module/project/project.module';
import { UserProjectModule } from './module/user_project/user_project.module';
import { TaskModule } from './module/task/task.module';
import { TimesheetModule } from './module/timesheet/timesheet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('databaseConnection') as 'mysql',
        host: configService.get<string>('databaseHost'),
        port: configService.get<number>('databasePort'),
        username: configService.get<string>('databaseUsername'),
        password: configService.get<string>('databasePassword'),
        database: configService.get<string>('databaseName'),
        entities: [User,Branch,Client,Project,Task,Timesheet,User_project],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ClientModule,
    ProjectModule,
    UserProjectModule,
    TaskModule,
    TimesheetModule,
  ],
})
export class AppModule {}
