import { Injectable } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Timesheet } from 'src/typeorm/entities/Timesheet';
import { Between, Repository } from 'typeorm';
import { UserProjectService } from '../user_project/user_project.service';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { StartEndDateDto } from './dto/start-end-date.dto';
import { TimesheetDto } from './dto/timesheets.dto';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectRepository(Timesheet)
    private TimesheetRepository: Repository<Timesheet>,
    private userProjectService: UserProjectService,
  ) {}
  create(createTimesheetDto: CreateTimesheetDto) {
    return this.TimesheetRepository.save(createTimesheetDto);
  }
  findOne(id: number) {
    return this.TimesheetRepository.findOne({
      where: { id },
      relations: ['user_project', 'task', 'user_project.project'],
    });
  }
  findTimesheetDay(id: number, dto: StartEndDateDto) {
    return this.TimesheetRepository.find({
      where: {
        user_project: {
          user: { id },
        },
        day: dto.start_date,
      },
      relations: ['user_project', 'task', 'user_project.project'],
    });
  }
  findTimesheetWeek(id: number, dto: StartEndDateDto) {
    return this.TimesheetRepository.find({
      where: {
        user_project: {
          user: { id },
        },
        day: Between(dto.start_date, dto.end_date),
      },
      relations: ['user_project', 'task', 'user_project.project'],
    });
  }
  findTimesheetInProject(id: number) {
    return this.TimesheetRepository.find({
      where: {
        user_project: {
          project: { id },
        },
      },
      relations: ['user_project', 'task'],
    });
  }
  async getTotalWorkTimeByTaskType(projectId: number) {
    const timesheets = await this.findTimesheetInProject(projectId);
    if (timesheets.length === 0) {
      return [];
    }
    const timesheetIds = timesheets.map((timesheet) => timesheet.id);
    return await this.TimesheetRepository.createQueryBuilder('timesheet')
      .leftJoin('timesheet.task', 'task')
      .select('task.name', 'taskName')
      .addSelect('SUM(timesheet.work_time)', 'totalWorkTime')
      .where('timesheet.id IN (:...timesheetIds)', { timesheetIds })
      .groupBy('task.name')
      .getRawMany();
  }
  async submit(userId: number, dto: StartEndDateDto): Promise<any> {
    const userProjects = await this.userProjectService.findAllPrjOfUser(userId);
    const start = dto.start_date;
    const end = dto.end_date;
    const userProjectIds = userProjects.map((up) => up.id);
    return await this.TimesheetRepository.createQueryBuilder('timesheet')
      .update(Timesheet)
      .set({ status: 'Pending' })
      .where('timesheet.userProjectId IN (:...userProjectIds)', {
        userProjectIds,
      })
      .andWhere('timesheet.day BETWEEN :start AND :end', { start, end })
      .andWhere('timesheet.status = :status', { status: 'New' })
      .execute();
  }
  async getTimesheetPend(
    id: number,
    options: IPaginationOptions,
  ): Promise<Pagination<Timesheet>> {
    const projectIsManager =
      await this.userProjectService.findProjectIsManager(id);
    const projectIsManagerIds = projectIsManager.map((up) => up.project.id);
    const queryBuilder = this.TimesheetRepository.createQueryBuilder(
      'timesheet',
    )
      .leftJoinAndSelect('timesheet.user_project', 'user_project')
      .leftJoinAndSelect('timesheet.task', 'task')
      .leftJoinAndSelect('user_project.project', 'project')
      .where('user_project.project.id IN (:...projectIsManagerIds)', {
        projectIsManagerIds,
      })
      .andWhere('timesheet.status = :status', { status: 'Pending' });
    return paginate<Timesheet>(queryBuilder, options);
  }
  async approve(dto: TimesheetDto) {
    const timesheetIds = dto.timesheetIds;
    return await this.TimesheetRepository.createQueryBuilder('timesheet')
      .update(Timesheet)
      .set({ status: 'Approved' })
      .where('timesheet.id IN (:...timesheetIds)', { timesheetIds })
      .andWhere('timesheet.status <> :excludedStatus', {
        excludedStatus: 'New',
      })
      .execute();
  }
  async reject(dto: TimesheetDto) {
    const timesheetIds = dto.timesheetIds;
    return await this.TimesheetRepository.createQueryBuilder('timesheet')
      .update(Timesheet)
      .set({ status: 'Rejected' })
      .where('timesheet.id IN (:...timesheetIds)', { timesheetIds })
      .andWhere('timesheet.status <> :excludedStatus', {
        excludedStatus: 'New',
      })
      .execute();
  }
  checkProject(prj_id: number) {
    return this.TimesheetRepository.findOne({
      where: {
        user_project: {
          project: { id: prj_id },
        },
      },
    });
  }
  async update(id: number, updateTimesheetDto: UpdateTimesheetDto) {
    const timesheet = await this.findOne(id);
    return await this.TimesheetRepository.save(
      Object.assign(timesheet, updateTimesheetDto),
    );
  }
  delete(id: number) {
    return this.TimesheetRepository.delete(id);
  }
}
