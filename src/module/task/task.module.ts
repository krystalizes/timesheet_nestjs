import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/typeorm/entities/Task';
import { CacheDeleteModule } from '../cache_delete/cache_delete.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), CacheDeleteModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TypeOrmModule, TaskService],
})
export class TaskModule {}
