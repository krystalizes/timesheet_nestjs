import { Branch } from 'src/typeorm/entities/Branch';

export class createUserDto {
  username: string;
  branch: Branch;
  password: string;
  email: string;
  name: string;
  address: string;
  DoB: Date;
  leave_day: number;
  sex: string;
  phone: string;
  work_time: string;
  position: string;
  user_type: string;
  user_level: string;
}
