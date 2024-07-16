import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from 'src/typeorm/entities/Client';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheDeleteModule } from '../cache_delete/cache_delete.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), CacheDeleteModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
