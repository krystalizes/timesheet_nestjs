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
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { Roles } from '../auth/common/decorator/get-role-user.decorator';
import { Role } from '../auth/common/enum/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../auth/common/decorator/get-current-user-id.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Timesheet } from 'src/typeorm/entities/Timesheet';
@ApiTags('Timesheet')
@Controller('timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @Post('create')
  create(@Body() createTimesheetDto: CreateTimesheetDto) {
    return this.timesheetService.create(createTimesheetDto);
  }

  @Roles(Role.PM)
  @Get('/pending')
  async getTimesheetPend(
    @GetCurrentUserId() id: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Timesheet>> {
    limit = limit > 100 ? 100 : limit;
    return this.timesheetService.getTimesheetPend(id, {
      page,
      limit,
      route: `/timesheet/pending/${id}`,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.timesheetService.findOne(id);
  }

  @Roles(Role.PM)
  @Get('/project/:prj_id')
  findTimesheetInProject(@Param('prj_id') id: number) {
    return this.timesheetService.getTotalWorkTimeByTaskType(id);
  }

  @Get('day/:user_id/:start')
  findTimesheetDay(
    @Param('start') start: Date,
    @Param('user_id') user_id: number,
  ) {
    return this.timesheetService.findTimesheetDay(user_id, start);
  }

  @Get('week/:user_id/:start/:end')
  findTimesheetWeek(
    @Param('user_id') user_id: number,
    @Param('start') start: Date,
    @Param('end') end: Date,
  ) {
    return this.timesheetService.findTimesheetWeek(user_id, start, end);
  }
  @Roles(Role.PM)
  @Patch('/approve')
  approve(@Body() timesheetids: number[]) {
    return this.timesheetService.approve(timesheetids);
  }
  @Roles(Role.PM)
  @Patch('/reject')
  reject(@Body() timesheetids: number[]) {
    return this.timesheetService.reject(timesheetids);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTimesheetDto: UpdateTimesheetDto,
  ) {
    return this.timesheetService.update(id, updateTimesheetDto);
  }

  @Patch('/submit/:start/:end')
  submit(
    @GetCurrentUserId() id: number,
    @Param('start') start: Date,
    @Param('end') end: Date,
  ) {
    return this.timesheetService.submit(id, start, end);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.timesheetService.delete(id);
  }
}
