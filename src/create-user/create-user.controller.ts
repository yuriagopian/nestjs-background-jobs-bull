import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './create-usert.dto';

@Controller('create-user')
export class CreateUserController {


    @Post()
    createUser(@Body() createUser: CreateUserDTO) {
        return createUser
    }
}
