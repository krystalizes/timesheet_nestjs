import { UserService } from './user.service';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { updateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/')
  getAllUser() {
    return this.userService.getAllUser();
  }
  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }
  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() updateUserData: updateUserDto) {
    return this.userService.updateUser(id, updateUserData);
  }
}
