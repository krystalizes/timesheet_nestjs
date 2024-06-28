import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { ClientModule } from './module/client/client.module';
import { ProjectModule } from './module/project/project.module';
import { UserProjectModule } from './module/user_project/user_project.module';
import { TaskModule } from './module/task/task.module';
import { TimesheetModule } from './module/timesheet/timesheet.module';
import { dataSourceOptions } from './config/database/ormConfig';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    ClientModule,
    ProjectModule,
    UserProjectModule,
    TaskModule,
    TimesheetModule,
    AuthModule,
  ],
})
export class AppModule {}
