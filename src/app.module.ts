import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user/create-user.controller';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.ethereal.email',
      port: 587,
      ignoreTLS: true,
      secure: false,
      auth: {
        user: process.env.MAILDEV_INCOMING_USER,
        pass: process.env.MAILDEV_INCOMING_PASS,
      },
    },
    preview: true,
  })],
  controllers: [CreateUserController],
  providers: [],
})
export class AppModule { }
