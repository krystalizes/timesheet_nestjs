import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Roles } from '../auth/common/decorator/get-role-user.decorator';
import { Role } from '../auth/common/enum/role.enum';
import { FilterProjectDto } from './dto/filter-project.dto';
import { SearchProjectDto } from './dto/search-project.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Roles(Role.Admin)
  @Post('/create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }
  @Roles(Role.Admin)
  @Get('/')
  findAll() {
    return this.projectService.findAll();
  }
  @Roles(Role.Admin)
  @Get('/filter')
  filterProjects(@Body() filterDto: FilterProjectDto) {
    console.log(1);
    return this.projectService.filterProjects(filterDto);
  }
  @Roles(Role.Admin)
  @Get('/search')
  searchByClientorName(@Body() searchDto: SearchProjectDto) {
    console.log(1);
    return this.projectService.searchByClientorName(searchDto);
  }
  @Roles(Role.Admin, Role.PM)
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.projectService.findOne({ id });
  }

  @Roles(Role.Admin)
  @Get('/client/:id')
  findPrjOfClient(@Param('id') id: number) {
    return this.projectService.findPrjOfClient({ id });
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update({ id }, updateProjectDto);
  }
  @Roles(Role.Admin)
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.projectService.remove({ id });
  }
  @Roles(Role.Admin)
  @Patch('/restore/:id')
  restore(@Param('id') id: number) {
    return this.projectService.restore({ id });
  }
}
