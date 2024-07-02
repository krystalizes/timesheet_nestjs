import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from './Task';
import { User_project } from './User_project';
import { TimesheetWorkType } from 'src/module/auth/common/enum/timesheet-work-type.enum';
import { TimesheetStatus } from 'src/module/auth/common/enum/timesheet-status.enum';
@Entity()
export class Timesheet {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  note: string;
  @Column({
    type: 'date',
  })
  day: Date;
  @Column()
  work_time: number;
  @Column({
    type: 'enum',
    enum: TimesheetWorkType,
  })
  work_type: string;
  @Column({
    type: 'enum',
    enum: TimesheetStatus,
  })
  status: string;
  @ManyToOne(() => User_project, (user_project) => user_project.timesheets)
  user_project: User_project;
  @ManyToOne(() => Task, (task) => task.timesheets)
  task: Task;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
