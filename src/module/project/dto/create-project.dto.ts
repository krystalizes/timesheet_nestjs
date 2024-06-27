import { Client } from 'src/typeorm/entities/Client';

export class CreateProjectDto {
  name: string;
  start_date: Date;
  end_date: Date;
  description: string;
  type: string;
  client: Client;
  user_id: number[];
  role: string[];
}
