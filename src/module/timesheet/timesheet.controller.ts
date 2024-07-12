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
import { StartEndDateDto } from './dto/start-end-date.dto';
import { TimesheetDto } from './dto/timesheets.dto';
import { StartDateDto } from './dto/start-date.dto';
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

  @Get('day/:user_id')
  findTimesheetDay(
    @Body() dto: StartDateDto,
    @Param('user_id') user_id: number,
  ) {
    return this.timesheetService.findTimesheetDay(user_id, dto);
  }

  @Get('week/:user_id')
  findTimesheetWeek(
    @Param('user_id') user_id: number,
    @Body() between: StartEndDateDto,
  ) {
    return this.timesheetService.findTimesheetWeek(user_id, between);
  }
  @Roles(Role.PM)
  @Patch('/approve')
  approve(@Body() dto: TimesheetDto) {
    return this.timesheetService.approve(dto);
  }
  @Roles(Role.PM)
  @Patch('/reject')
  reject(@Body() dto: TimesheetDto) {
    return this.timesheetService.reject(dto);
  }
  @Patch('/submit')
  submit(@GetCurrentUserId() id: number, @Body() between: StartEndDateDto) {
    return this.timesheetService.submit(id, between);
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTimesheetDto: UpdateTimesheetDto,
  ) {
    return this.timesheetService.update(id, updateTimesheetDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.timesheetService.delete(id);
  }
}
