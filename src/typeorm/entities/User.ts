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
import { RoleUser } from 'src/module/auth/common/enum/role-user.enum';
import { UserType } from 'src/module/auth/common/enum/uesr-type.enum';
import { UserLevel } from 'src/module/auth/common/enum/user-level.enum';
import { UserSex } from 'src/module/auth/common/enum/user-sex.enum';
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
    enum: UserSex,
  })
  sex: string;
  @Column({ unique: true })
  phone: string;
  @Column({
    default: null,
  })
  image?: string;
  @Column({ default: '08:30-17:30' })
  work_time: string;
  @Column({
    type: 'enum',
    enum: RoleUser,
    nullable: true,
  })
  role: string;
  @Column({
    type: 'enum',
    enum: UserType,
  })
  user_type: string;
  @Column({
    type: 'enum',
    enum: UserLevel,
  })
  user_level: string;
  @Column({ nullable: true })
  hashedRt: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToMany(() => User_project, (user_project) => user_project.user)
  UserToProject: User_project[];
}
