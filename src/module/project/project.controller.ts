import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Roles } from '../auth/common/decorator/get-role-user.decorator';
import { Role } from '../auth/common/enum/role.enum';
import { FilterProjectDto } from './dto/filter-project.dto';
import { SearchProjectDto } from './dto/search-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Project } from 'src/typeorm/entities/Project';
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
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Project>> {
    limit = limit > 100 ? 100 : limit;
    return this.projectService.findAll({
      page,
      limit,
      route: '/project/',
    });
  }
  @Roles(Role.Admin)
  @Get('/filter')
  async filterProjects(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Body() filterDto: FilterProjectDto,
  ): Promise<Pagination<Project>> {
    limit = limit > 100 ? 100 : limit;
    return this.projectService.filterProjects(filterDto, {
      page,
      limit,
      route: '/project/filter',
    });
  }
  @Roles(Role.Admin)
  @Get('/search')
  async searchByClientorName(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Body() searchDto: SearchProjectDto,
  ): Promise<Pagination<Project>> {
    limit = limit > 100 ? 100 : limit;
    return this.projectService.searchByClientorName(searchDto, {
      page,
      limit,
      route: '/project/search',
    });
  }
  @Roles(Role.Admin, Role.PM)
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.projectService.findOne(id);
  }

  @Roles(Role.Admin)
  @Get('/client/:id')
  async findPrjOfClient(
    @Param('id') id: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Project>> {
    limit = limit > 100 ? 100 : limit;
    return this.projectService.findPrjOfClient(id, {
      page,
      limit,
      route: `/project/client/${id}`,
    });
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }
  @Roles(Role.Admin)
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.projectService.remove(id);
  }
  @Roles(Role.Admin)
  @Patch('/restore/:id')
  restore(@Param('id') id: number) {
    return this.projectService.restore(id);
  }
}
