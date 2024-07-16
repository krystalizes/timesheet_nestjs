import { Module } from '@nestjs/common';
import { CacheDeleteService } from './cache_delete.service';

@Module({
  providers: [CacheDeleteService],
  exports: [CacheDeleteService],
})
export class CacheDeleteModule {}
