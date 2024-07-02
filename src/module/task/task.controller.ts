import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Roles } from '../auth/common/decorator/get-role-user.decorator';
import { Role } from '../auth/common/enum/role.enum';
import { FilterProjectDto } from '../project/dto/filter-project.dto';
import { SearchProjectDto } from '../project/dto/search-project.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Roles(Role.Admin)
  @Post('/create')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }
  @Get('/project/:prj_id')
  findAll(@Param('prj_id') id: number) {
    return this.taskService.findTaskInPrj(id);
  }
  @Roles(Role.Admin)
  @Get('/search')
  searchByName(@Body() searchDto: SearchProjectDto) {
    return this.taskService.searchByName(searchDto);
  }
  @Roles(Role.Admin)
  @Get('/filter')
  filterTasks(@Body() filterDto: FilterProjectDto) {
    return this.taskService.filterTasks(filterDto);
  }
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }
  @Roles(Role.Admin)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
  @Roles(Role.Admin)
  @Delete('/soft_del/:id')
  remove(@Param('id') id: number) {
    return this.taskService.remove(id);
  }
  @Roles(Role.Admin)
  @Patch('/restore/:id')
  restore(@Param('id') id: number) {
    return this.taskService.restore(id);
  }
}
