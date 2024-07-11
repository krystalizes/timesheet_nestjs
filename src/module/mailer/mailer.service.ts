import { UserService } from 'src/module/user/user.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly userService: UserService) {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  @Cron('0 9 * * 6')
  async sendMail() {
    const users = await this.userService.getAllUser();
    const emailAddresses = users.map((user) => user.email);
    await this.transporter.sendMail({
      from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_FROM}>`,
      to: emailAddresses.join(','),
      subject: 'Notification[NCC]',
      text: 'Remember to submit your weekly timesheet before 24h Sunday',
    });
  }
}
