import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { CreateUserController } from './create-user/create-user.controller';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from "@nestjs/config"
import { SendMailProducerService } from './jobs/sendmail-producer-service';
import { SendMailConsumerService } from './jobs/sendmail-consumer-service';
import { join } from 'path';
import { Queue } from 'bull';
import { MiddlewareBuilder } from '@nestjs/core';
import { createBullBoard } from 'bull-board'
import { BullAdapter } from 'bull-board/bullAdapter'

@Module({

  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'sendMail-queue'
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
      },
    }),
  ],
  controllers: [CreateUserController],
  providers: [SendMailConsumerService, SendMailProducerService],
})


export class AppModule {
  constructor(@InjectQueue('sendMail-queue') private sendMailQueue: Queue) { }
  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([new BullAdapter(this.sendMailQueue)])
    consumer.apply(router).forRoutes('/queue-admin');

  }
}

