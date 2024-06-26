import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserProjectService } from './user_project.service';
import { CreateUserProjectDto } from './dto/create-user_project.dto';
import { UpdateUserProjectDto } from './dto/update-user_project.dto';

@Controller('user_project')
export class UserProjectController {
  constructor(private readonly userProjectService: UserProjectService) {}

  @Post('/create')
  create(@Body() createUserProjectDto: CreateUserProjectDto) {
    return this.userProjectService.create(createUserProjectDto);
  }
  
  @Get('/team_manage/:user_id')
  findProjectIsManager(@Param('user_id') id: number) {
    return this.userProjectService.findProjectIsManager(id);
  }

  @Get('/user_in_prj/:prj_id')
  findAllUserInPrj(@Param('prj_id') id: number) {
    return this.userProjectService.findAllUserInPrj(id);
  }

  @Get('/prj_of_user/:user_id')
  findAllPrjOfUser(@Param('user_id') id: number) {
    return this.userProjectService.findAllPrjOfUser(id);
  }
  @Get('/:prj_id/:user_id')
  findRoleUser(@Param() params: { [key: string]: number }) {
    return this.userProjectService.findRoleUser(params.prj_id, params.user_id);
  }

  @Patch('/:prj_id/:user_id')
  updateRole(@Param() params: { [key: string]: number }, @Body() updateUserProjectDto: UpdateUserProjectDto) {
    return this.userProjectService.updateRole(params.prj_id, params.user_id, updateUserProjectDto);
  }

  @Delete('/:prj_id/:user_id')
  remove(@Param() params: { [key: string]: number }) {
    return this.userProjectService.remove(params.prj_id, params.user_id);
  }
}
