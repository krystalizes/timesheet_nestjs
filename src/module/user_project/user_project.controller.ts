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
import { ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('User Project')
@Controller('user_project')
export class UserProjectController {
  constructor(private readonly userProjectService: UserProjectService) {}

  @Post('/create')
  create(@Body() createUserProjectDto: CreateUserProjectDto) {
    return this.userProjectService.create(createUserProjectDto);
  }

  @Get('/team_manage/:user_id')
  @ApiParam({ name: 'user_id', type: Number, description: 'User ID' })
  findProjectIsManager(@Param('user_id') id: number) {
    return this.userProjectService.findProjectIsManager(id);
  }

  @Get('/user_in_prj/:prj_id')
  @ApiParam({ name: 'prj_id', type: Number, description: 'Project ID' })
  findAllUserInPrj(@Param('prj_id') id: number) {
    return this.userProjectService.findAllUserInPrj(id);
  }

  @Get('/prj_of_user/:user_id')
  @ApiParam({ name: 'user_id', type: Number, description: 'User ID' })
  findAllPrjOfUser(@Param('user_id') id: number) {
    return this.userProjectService.findAllPrjOfUser(id);
  }
  @Get('/:prj_id/:user_id')
  @ApiParam({ name: 'user_id', type: Number, description: 'User ID' })
  @ApiParam({ name: 'prj_id', type: Number, description: 'Project ID' })
  findRoleUser(@Param() params: { [key: string]: number }) {
    return this.userProjectService.findRoleUser(params.prj_id, params.user_id);
  }

  @Patch('/:prj_id/:user_id')
  @ApiParam({ name: 'user_id', type: Number, description: 'User ID' })
  @ApiParam({ name: 'prj_id', type: Number, description: 'Project ID' })
  updateRole(
    @Param() params: { [key: string]: number },
    @Body() updateUserProjectDto: UpdateUserProjectDto,
  ) {
    return this.userProjectService.updateRole(
      params.prj_id,
      params.user_id,
      updateUserProjectDto,
    );
  }

  @Delete('/:prj_id/:user_id')
  @ApiParam({ name: 'user_id', type: Number, description: 'User ID' })
  @ApiParam({ name: 'prj_id', type: Number, description: 'Project ID' })
  remove(@Param() params: { [key: string]: number }) {
    return this.userProjectService.remove(params.prj_id, params.user_id);
  }
}
