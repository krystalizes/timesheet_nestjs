import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CloudflareModule } from '../cloudflare/cloudflare.module';
import { CacheDeleteModule } from '../cache_delete/cache_delete.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CloudflareModule,
    CacheDeleteModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
