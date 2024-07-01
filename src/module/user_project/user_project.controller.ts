import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserProjectService } from './user_project.service';
import { CreateUserProjectDto } from './dto/create-user_project.dto';
import { UpdateUserProjectDto } from './dto/update-user_project.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/common/decorator/get-role-user.decorator';
import { Role } from '../auth/common/enum/role.enum';
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
  findAllUserInPrj(@Param('prj_id') id: number) {
    return this.userProjectService.findAllUserInPrj(id);
  }

  @Get('/prj_of_user/:user_id')
  findAllPrjOfUser(@Param('user_id') id: number) {
    return this.userProjectService.findAllPrjOfUser(id);
  }
  @Get('/:prj_id/:user_id')
  findRoleUser(
    @Param('prj_id') prj_id: number,
    @Param('user_id') user_id: number,
  ) {
    return this.userProjectService.findRoleUser(prj_id, user_id);
  }
  @Roles(Role.Admin)
  @Patch('/:prj_id/:user_id')
  updateRole(
    @Param('prj_id') prj_id: number,
    @Param('user_id') user_id: number,
    @Body() updateUserProjectDto: UpdateUserProjectDto,
  ) {
    return this.userProjectService.updateRole(
      prj_id,
      user_id,
      updateUserProjectDto,
    );
  }
  @Roles(Role.Admin)
  @Delete('/:prj_id/:user_id')
  remove(@Param('prj_id') prj_id: number, @Param('user_id') user_id: number) {
    return this.userProjectService.remove(prj_id, user_id);
  }
}
