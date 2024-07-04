import { Injectable } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Timesheet } from 'src/typeorm/entities/Timesheet';
import { Between, In, Repository } from 'typeorm';
import { UserProjectService } from '../user_project/user_project.service';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectRepository(Timesheet)
    private TimesheetRepository: Repository<Timesheet>,
    private userProjectService: UserProjectService,
  ) {}
  // tạo timesheet mới
  create(createTimesheetDto: CreateTimesheetDto) {
    return this.TimesheetRepository.save(createTimesheetDto);
  }
  // get 1 timesheet theo id
  findOne(id: number) {
    return this.TimesheetRepository.findOne({
      where: { id },
      relations: ['user_project', 'task', 'user_project.project'],
    });
  }
  // get tất cả timesheet trong ngày
  findTimesheetDay(id: number, start: Date) {
    return this.TimesheetRepository.find({
      where: {
        user_project: {
          user: { id },
        },
        day: start,
      },
      relations: ['user_project', 'task', 'user_project.project'],
    });
  }
  // get tất cả timesheet theo tuần(start và end thì frontend phải tự xác định)
  findTimesheetWeek(id: number, start: Date, end: Date) {
    return this.TimesheetRepository.find({
      where: {
        user_project: {
          user: { id },
        },
        day: Between(start, end),
      },
      relations: ['user_project', 'task', 'user_project.project'],
    });
  }
  // get tất cả timesheet trong 1 project(dùng để hiển thị lên cho các chức năng của Manager project đó)
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
  //lấy tổng thời gian của mỗi task trong project mà người login là Mangager project đó để show lên frontend
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

  // submit timesheet
  async submit(userId: number, start: Date, end: Date): Promise<any> {
    const userProjects = await this.userProjectService.findAllPrjOfUser(userId);
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
  // get timesheet pending
  async getTimesheetPend(id: number) {
    const projectIsManager =
      await this.userProjectService.findProjectIsManager(id);
    const projectIsManagerIds = projectIsManager.map((up) => up.project.id);
    return await this.TimesheetRepository.find({
      where: {
        user_project: {
          project: { id: In(projectIsManagerIds) },
        },
        status: 'Pending',
      },
      relations: ['user_project', 'task', 'user_project.project'],
    });
  }
  // approve timesheet theo week(Manager)
  async approve(timesheetIds: number[]) {
    return await this.TimesheetRepository.createQueryBuilder('timesheet')
      .update(Timesheet)
      .set({ status: 'Approved' })
      .where('timesheet.id IN (:...timesheetIds)', { timesheetIds })
      .andWhere('timesheet.status <> :excludedStatus', {
        excludedStatus: 'New',
      })
      .execute();
  }
  // Reject timesheet theo week(Manager)
  async reject(timesheetIds: number[]) {
    return await this.TimesheetRepository.createQueryBuilder('timesheet')
      .update(Timesheet)
      .set({ status: 'Rejected' })
      .where('timesheet.id IN (:...timesheetIds)', { timesheetIds })
      .andWhere('timesheet.status <> :excludedStatus', {
        excludedStatus: 'New',
      })
      .execute();
  }
  // kiểm tra xem có timesheet nào với project này đã được log(nếu có thì không thể xoá project)
  checkProject(prj_id: number) {
    return this.TimesheetRepository.findOne({
      where: {
        user_project: {
          project: { id: prj_id },
        },
      },
    });
  }
  // update timesheet( có thể thêm ràng buộc chỉ có thể sửa nếu là pending hoặc new(đã có ở frontend))
  async update(id: number, updateTimesheetDto: UpdateTimesheetDto) {
    const timesheet = await this.findOne(id);
    return await this.TimesheetRepository.save(
      Object.assign(timesheet, updateTimesheetDto),
    );
  }
  // force delete timesheet
  delete(id: number) {
    return this.TimesheetRepository.delete(id);
  }
}
