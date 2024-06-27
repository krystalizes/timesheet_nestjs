import { Project } from 'src/typeorm/entities/Project';

export class CreateTaskDto {
  name: string;
  start_date: Date;
  end_date: Date;
  description: string;
  type: string;
  status: string;
  project: Project;
}
