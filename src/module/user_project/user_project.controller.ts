import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UserProjectService } from './user_project.service';
import { CreateUserProjectDto } from './dto/create-user_project.dto';
import { UpdateUserProjectDto } from './dto/update-user_project.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/common/decorator/get-role-user.decorator';
import { Role } from '../auth/common/enum/role.enum';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User_project } from 'src/typeorm/entities/User_project';
@ApiTags('User Project')
@Controller('user_project')
export class UserProjectController {
  constructor(private readonly userProjectService: UserProjectService) {}
  @Roles(Role.Admin)
  @Post('/create')
  create(@Body() createUserProjectDto: CreateUserProjectDto) {
    return this.userProjectService.create(createUserProjectDto);
  }
  @Roles(Role.PM)
  @Get('/team_manage/:user_id')
  findProjectIsManager(@Param('user_id') id: number) {
    return this.userProjectService.findProjectIsManager(id);
  }
  @Roles(Role.PM, Role.Admin)
  @Get('/user_in_prj/:prj_id')
  findAllUserInPrj(
    @Param('prj_id') id: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<User_project>> {
    limit = limit > 100 ? 100 : limit;
    return this.userProjectService.findAllUserInPrj(id, {
      page,
      limit,
      route: `/user_project/user_in_prj/${id}`,
    });
  }

  @Get('/prj_of_user/:user_id')
  findAllPrjOfUser(@Param('user_id') id: number) {
    return this.userProjectService.findAllPrjOfUser(id);
  }
  @Get('/:id')
  findRoleUser(@Param('id') id: number) {
    return this.userProjectService.findRoleUser(id);
  }
  @Roles(Role.Admin)
  @Patch('/:id')
  updateRole(
    @Param('id') id: number,
    @Body() updateUserProjectDto: UpdateUserProjectDto,
  ) {
    return this.userProjectService.updateRole(id, updateUserProjectDto);
  }
  @Roles(Role.Admin)
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.userProjectService.remove(id);
  }
}
