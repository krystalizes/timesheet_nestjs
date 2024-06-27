import { Task } from 'src/typeorm/entities/Task';
import { User_project } from 'src/typeorm/entities/User_project';

export class CreateTimesheetDto {
  note: string;
  day: Date;
  work_time: number;
  work_type: string;
  status: string;
  user_project: User_project;
  task: Task;
}
