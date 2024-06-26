import { createUserDto } from 'src/module/user/dto/createUser.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { updateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly UserService:UserService){}
    @Get("/")
    getAllUser(){
        return this.UserService.getAllUser();
    }
    @Get("/:id")
    getUser(@Param('id') id: number){
        return this.UserService.getUser(id);
    }
    @Post("/create")
    async createUser(@Body() createUserData:createUserDto){
        return await this.UserService.createUser(createUserData);
    }
    @Patch("/:id")
    updateUser(@Param('id') id: number,@Body() updateUserData:updateUserDto){
        return this.UserService.updateUser(id,updateUserData);
    }
}
