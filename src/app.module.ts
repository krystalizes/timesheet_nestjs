import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from './module/mailer/mailer.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { RefreshTokenMiddleware } from './module/auth/common/middleware/refresh-token.middleware';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
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
    ScheduleModule.forRoot(),
    UserModule,
    ClientModule,
    ProjectModule,
    UserProjectModule,
    TaskModule,
    TimesheetModule,
    AuthModule,
    CloudflareModule,
    MailerModule,
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
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RefreshTokenMiddleware).forRoutes('*'); // Apply to all routes
  }
}
