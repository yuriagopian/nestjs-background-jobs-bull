import { MailerService } from '@nestjs-modules/mailer'
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './create-usert.dto';

@Controller('create-user')
export class CreateUserController {
    constructor(private mailService: MailerService) { }

    @Post()
    async createUser(@Body() createUser: CreateUserDTO) {
        await this.mailService.sendMail({
            to: createUser.email,
            from: "TeraTech <yuri@gmail.com>",
            subject: "Welcome",
            text: `Hello, ${createUser.name}! 
            Welcome to TeraTech!`
        });

        return createUser
    };
}
