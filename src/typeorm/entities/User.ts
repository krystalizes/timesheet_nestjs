import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Branch } from './Branch';
import { User_project } from './User_project';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Branch, (branch) => branch.users)
  branch: Branch;
  @Column()
  name: string;
  @Column()
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  address: string;
  @Column({
    type: 'date',
  })
  DoB: Date;
  @Column()
  leave_day: number;
  @Column({
    type: 'enum',
    enum: ['Male', 'Female'],
  })
  sex: string;
  @Column({ unique: true })
  phone: string;
  @Column()
  work_time: string;
  @Column({
    type: 'enum',
    enum: ['Dev', 'HR', 'PM', 'CEO'],
  })
  position: string;
  @Column({
    type: 'enum',
    enum: ['Staff', 'Intern', 'Colaborator'],
  })
  user_type: string;
  @Column({
    type: 'enum',
    enum: [
      'Intern_0',
      'Intern_1',
      'Intern_2',
      'Intern_3',
      'Fresher',
      'Junior',
      'Senior',
    ],
  })
  user_level: string;
  @Column({
    type: 'enum',
    enum: ['Admin', 'User'],
    default: 'User',
  })
  role: string;
  @Column()
  hash: string;
  @Column()
  hashedRt: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToMany(() => User_project, (user_project) => user_project.user)
  UserToProject: User_project[];
}
