import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [MailerService],
})
export class MailerModule {}
