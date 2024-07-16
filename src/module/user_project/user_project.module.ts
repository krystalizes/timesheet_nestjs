import { Module } from '@nestjs/common';
import { UserProjectService } from './user_project.service';
import { UserProjectController } from './user_project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_project } from 'src/typeorm/entities/User_project';
import { CacheDeleteModule } from '../cache_delete/cache_delete.module';

@Module({
  imports: [TypeOrmModule.forFeature([User_project]), CacheDeleteModule],
  controllers: [UserProjectController],
  providers: [UserProjectService],
  exports: [TypeOrmModule, UserProjectService],
})
export class UserProjectModule {}
