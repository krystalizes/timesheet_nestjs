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

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/create')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get('/project/:prj_id')
  findAll(@Param('prj_id') id: number) {
    return this.taskService.findTaskInPrj(id);
  }

  @Get('search/:input')
  searchByName(@Param('input') input: string) {
    return this.taskService.searchByName(input);
  }

  @Get('/filter/:status')
  filterTasks(@Param('status') status: string) {
    return this.taskService.filterTasks(status);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }

  @Delete('/soft_del/:id')
  remove(@Param('id') id: number) {
    return this.taskService.remove(id);
  }
  @Patch('/restore/:id')
  restore(@Param('id') id: number) {
    return this.taskService.restore(id);
  }
}
