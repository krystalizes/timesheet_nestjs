import { Module } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timesheet } from 'src/typeorm/entities/Timesheet';
import { UserProjectModule } from '../user_project/user_project.module';
import { CacheDeleteModule } from '../cache_delete/cache_delete.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Timesheet]),
    UserProjectModule,
    CacheDeleteModule,
  ],
  controllers: [TimesheetController],
  providers: [TimesheetService],
  exports: [TypeOrmModule, TimesheetService],
})
export class TimesheetModule {}
