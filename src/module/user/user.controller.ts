import { UserService } from './user.service';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { updateUserDto } from './dto/updateUser.dto';
import { Roles } from '../auth/common/decorator/get-role-user.decorator';
import { Role } from '../auth/common/enum/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../auth/common/decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/typeorm/entities/User';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Roles(Role.Admin)
  @Get('/')
  async getAllUser(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.getAllUserPaginate({
      page,
      limit,
      route: `/user/`,
    });
  }

  @Get('/:id')
  getUser(@Param('id') id: number) {
    console.log(1);
    return this.userService.getUser(id);
  }
  @Roles(Role.Admin)
  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() updateUserData: updateUserDto) {
    return this.userService.updateUser(id, updateUserData);
  }
  @Post('/upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  async addImg(
    @UploadedFile() file: Express.Multer.File,
    @GetCurrentUserId() id: number,
  ) {
    await this.userService.addImg(file, id);
  }
}
