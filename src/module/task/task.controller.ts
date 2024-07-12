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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Roles } from '../auth/common/decorator/get-role-user.decorator';
import { Role } from '../auth/common/enum/role.enum';
import { FilterProjectDto } from '../project/dto/filter-project.dto';
import { SearchProjectDto } from '../project/dto/search-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Task } from 'src/typeorm/entities/Task';
@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Roles(Role.Admin)
  @Post('/create')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }
  @Get('/project/:prj_id')
  findAll(
    @Param('prj_id') id: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Task>> {
    limit = limit > 100 ? 100 : limit;
    return this.taskService.findTaskInPrj(id, {
      page,
      limit,
      route: `/task/project/${id}`,
    });
  }
  @Roles(Role.Admin)
  @Get('/search')
  async searchByName(
    @Body() searchDto: SearchProjectDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Task>> {
    limit = limit > 100 ? 100 : limit;
    return this.taskService.searchByName(searchDto, {
      page,
      limit,
      route: `/task/search`,
    });
  }
  @Roles(Role.Admin)
  @Get('/filter')
  async filterTasks(
    @Body() filterDto: FilterProjectDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Task>> {
    limit = limit > 100 ? 100 : limit;
    return this.taskService.filterTasks(filterDto, {
      page,
      limit,
      route: `/task/filter`,
    });
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
