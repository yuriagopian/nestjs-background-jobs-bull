import { CreateUserDTO } from 'src/create-user/create-usert.dto';
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { MailerService } from '@nestjs-modules/mailer'


@Processor('sendMail-queue')
class SendMailConsumerService {

    constructor(private mailService: MailerService) { }

    @Process("sendMail-job")
    async sendMailJob(job: Job<CreateUserDTO>) {

        const { data } = job;

        await this.mailService.sendMail({
            to: data.email,
            from: "TeraTech <yuri@gmail.com>",
            subject: "Welcome",
            text: `Hello, ${data.name}! 
        Welcome to TeraTech!`
        });


    }
}

export { SendMailConsumerService }
