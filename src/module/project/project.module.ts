import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/typeorm/entities/Project';
import { UserProjectModule } from 'src/module/user_project/user_project.module';
import { UserModule } from 'src/module/user/user.module';
import { TaskModule } from '../task/task.module';
import { TimesheetModule } from '../timesheet/timesheet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]),UserProjectModule,UserModule,TaskModule,TimesheetModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
