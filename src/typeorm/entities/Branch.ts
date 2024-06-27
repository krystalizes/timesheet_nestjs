import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './User';
@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  codename: string;
  @Column()
  address: string;
  @OneToMany(() => User, (user) => user.branch)
  users: User[];
}
