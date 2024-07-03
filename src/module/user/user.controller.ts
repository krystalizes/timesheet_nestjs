import { UserService } from './user.service';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { updateUserDto } from './dto/updateUser.dto';
import { Roles } from '../auth/common/decorator/get-role-user.decorator';
import { Role } from '../auth/common/enum/role.enum';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Roles(Role.Admin)
  @Get('/')
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }
  @Roles(Role.Admin)
  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() updateUserData: updateUserDto) {
    return this.userService.updateUser(id, updateUserData);
  }
}
