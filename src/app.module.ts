import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { ClientModule } from './module/client/client.module';
import { ProjectModule } from './module/project/project.module';
import { UserProjectModule } from './module/user_project/user_project.module';
import { TaskModule } from './module/task/task.module';
import { TimesheetModule } from './module/timesheet/timesheet.module';
import { AuthModule } from './module/auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AtGuard } from './module/auth/common/guards';
import { RolesGuard } from './module/auth/common/guards/role.guard';
import { CloudflareModule } from './module/cloudflare/cloudflare.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './config/database/TypeOrmConfigService';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/config/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    UserModule,
    ClientModule,
    ProjectModule,
    UserProjectModule,
    TaskModule,
    TimesheetModule,
    AuthModule,
    CloudflareModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
