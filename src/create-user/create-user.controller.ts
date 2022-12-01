import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { SendMailProducerService } from 'src/jobs/sendmail-producer-service';
import { CreateUserDTO } from './create-usert.dto';

@Controller('create-user')
export class CreateUserController {
    constructor(private sendMailService: SendMailProducerService) { }

    @Post()
    async createUser(@Body() createUser: CreateUserDTO) {
        this.sendMailService.sendMail(createUser)
        return createUser
    };
}
