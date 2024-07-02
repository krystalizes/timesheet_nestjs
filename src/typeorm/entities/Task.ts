import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Project } from './Project';
import { Timesheet } from './Timesheet';
import { ProjectStatus } from 'src/module/auth/common/enum/project-status.enum';
import { TaskType } from 'src/module/auth/common/enum/task-type.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  start_date: Date;
  @Column()
  end_date: Date;
  @Column()
  description: string;
  @Column({
    type: 'enum',
    enum: TaskType,
    default: TaskType.Other_Tasks,
  })
  type: string;
  @Column({
    type: 'enum',
    enum: ProjectStatus,
  })
  status: string;
  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
  @OneToMany(() => Timesheet, (timesheet) => timesheet.task)
  timesheets: Timesheet[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @DeleteDateColumn()
  deleted_at: Date;
}
