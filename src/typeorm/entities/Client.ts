import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './Project';
@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  code: string;
  @Column()
  address: string;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  phone: string;
  @OneToMany(() => Project, (project) => project.client)
  projects: Project[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
