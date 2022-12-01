import { CreateUserDTO } from 'src/create-user/create-usert.dto';
import { OnGlobalQueueCompleted, OnQueueActive, OnQueueCompleted, OnQueueError, OnQueueProgress, Process, Processor } from "@nestjs/bull";
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

    @OnQueueCompleted()
    onCompleted(job: Job) {
        console.log(`On Completed ${job.name}`)
    }

    @OnQueueProgress()
    onProgress(job: Job, progress: number) {
        console.log(`On Progress ${job.name} ${progress}`)
    }

    @OnQueueError()
    onError(error: Error) {
        console.log(`On Error ${error}`)
    }

    @OnQueueActive()
    onActive(job: Job) {
        console.log(
            `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }


}

export { SendMailConsumerService }
