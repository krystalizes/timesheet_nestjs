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
    enum: ['Common Tasks', 'Other Tasks'],
    default: 'Other Tasks',
  })
  type: string;
  @Column({
    type: 'enum',
    enum: ['Active', 'Inactive'],
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
