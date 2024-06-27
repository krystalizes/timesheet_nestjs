import { Project } from 'src/typeorm/entities/Project';
import { User } from 'src/typeorm/entities/User';

export class CreateUserProjectDto {
  role: string;
  user: User;
  project: Project;
}
