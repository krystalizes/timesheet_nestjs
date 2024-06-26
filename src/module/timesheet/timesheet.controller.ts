import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { time } from 'console';

@Controller('timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @Post('create')
  create(@Body() createTimesheetDto: CreateTimesheetDto) {
    return this.timesheetService.create(createTimesheetDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.timesheetService.findOne(id);
  }

  @Get('/pending/:id')
  getTimesheetPend(@Param('id') id: number) {
    return this.timesheetService.getTimesheetPend(id);
  }

  @Get('/project/:prj_id')
  findTimesheetInProject(@Param('prj_id') id: number) {
    return this.timesheetService.getTotalWorkTimeByTaskType(id);
  }

  @Get('day/:user_id/:start')
  findTimesheetDay(@Param('start') start: Date, @Param('user_id') user_id: number) {
    return this.timesheetService.findTimesheetDay(user_id, start);
  }

  @Get('week/:user_id/:start/:end')
  findTimesheetWeek(@Param('user_id') user_id: number,@Param('start') start: Date, @Param('end') end: Date) {
    return this.timesheetService.findTimesheetWeek(user_id,start, end);
  }

  @Patch("/approve")
  approve(@Body() timesheetids:number[]){
    console.log(timesheetids)
    return this.timesheetService.approve(timesheetids); 
  }

  @Patch("/reject")
  reject(@Body() timesheetids:number[]){
    console.log(timesheetids)
    return this.timesheetService.reject(timesheetids); 
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTimesheetDto: UpdateTimesheetDto) {
    return this.timesheetService.update(id, updateTimesheetDto);
  }

  @Patch("/submit/:user_id/:start/:end")
  submit(@Param('user_id') user_id: number, @Param('start') start: Date, @Param('end') end: Date){
    return this.timesheetService.submit(user_id, start, end); 
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.timesheetService.delete(id);
  }
}
