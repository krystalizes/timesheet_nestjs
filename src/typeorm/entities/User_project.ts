import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Project } from './Project';
import { User } from './User';
import { Timesheet } from './Timesheet';
@Entity()
export class User_project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'enum',
    enum: ['Member', 'Manager'],
  })
  role: string;
  @ManyToOne(() => User, (user) => user.UserToProject)
  user: User;
  @ManyToOne(() => Project, (project) => project.ProjectToUser)
  project: Project;
  @OneToMany(() => Timesheet, (timesheet) => timesheet.user_project)
  timesheets: Timesheet[];
}
