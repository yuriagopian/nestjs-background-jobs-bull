import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";
import { CreateUserDTO } from "src/create-user/create-usert.dto";

@Injectable()
class SendMailProducerService {
    constructor(@InjectQueue('sendMail-queue') private queue: Queue) { }

    async sendMail(createUserDTO: CreateUserDTO) {
        await this.queue.add("sendMail-job", createUserDTO);
    }
}


export { SendMailProducerService }