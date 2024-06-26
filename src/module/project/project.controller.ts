import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get('/')
  findAll() {
    return this.projectService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.projectService.findOne(id);
  }

  @Get('/client/:id')
  findPrjOfClient(@Param('id') id: number) {
    return this.projectService.findPrjOfClient(id);
  }

  @Get('search/:input')
  searchByClientorName(@Param('input') input:string){
    return this.projectService.searchByClientorName(input);
  }

  @Get('/filter/:status')
  filterProjects(@Param('status') status:string) {
    return this.projectService.filterProjects(status);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.projectService.remove(id);
  }
  @Patch('/restore/:id')
  restore(@Param('id' ) id: number) {
    return this.projectService.restore(id);
  }
}
