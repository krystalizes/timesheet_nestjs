import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/typeorm/entities/Project';
import { EntityManager, ILike, Repository } from 'typeorm';
import { CreateUserProjectDto } from 'src/module/user_project/dto/create-user_project.dto';
import { UserService } from 'src/module/user/user.service';
import { TaskService } from '../task/task.service';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { UserProjectService } from '../user_project/user_project.service';
import { TimesheetService } from '../timesheet/timesheet.service';
import { FilterProjectDto } from './dto/filter-project.dto';
import { SearchProjectDto } from './dto/search-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private ProjectRepository: Repository<Project>,
    private userService: UserService,
    private taskService: TaskService,
    private userProjectService: UserProjectService,
    private timesheetService: TimesheetService,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createProjectDto: CreateProjectDto) {
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      const { user_id, role, ...projectData } = createProjectDto;
      const project = transactionalEntityManager.create(Project, projectData);
      await transactionalEntityManager.save(project);
      if (user_id && user_id.length > 0) {
        const userProjectPromises = user_id.map(async (userId, index) => {
          const user = await this.userService.getUser(userId, true);
          const createUserProjectDto: CreateUserProjectDto = {
            role: role[index],
            user: user,
            project: project,
          };
          return this.userProjectService.create(
            createUserProjectDto,
            transactionalEntityManager,
          );
        });
        await Promise.all(userProjectPromises);
      }
      const commonTasks = [
        'Design',
        'Marketing',
        'Programming',
        'Project Management',
        'Business Development',
      ];
      const taskPromises = commonTasks.map(async (taskName) => {
        const createTaskDto: CreateTaskDto = {
          name: taskName,
          start_date: project.start_date,
          end_date: project.end_date,
          description: '',
          type: 'Common Tasks',
          status: 'Active',
          project: project,
        };
        return this.taskService.create(
          createTaskDto,
          transactionalEntityManager,
        );
      });

      await Promise.all(taskPromises);
      return project;
    });
  }
  findAll() {
    return this.ProjectRepository.find({ relations: ['client'] });
  }
  findOne(id: number) {
    return this.ProjectRepository.findOne({
      where: { id },
      relations: ['client'],
    });
  }
  findPrjOfClient(id: number) {
    return this.ProjectRepository.find({
      where: [{ client: { id } }],
      relations: ['client'],
    });
  }
  searchByClientorName(searchDto: SearchProjectDto) {
    const { input } = searchDto;
    return this.ProjectRepository.find({
      where: [
        { name: ILike(`%${input}%`) },
        { client: { name: ILike(`%${input}%`) } },
      ],
      relations: ['client'],
    });
  }
  filterProjects(filterDto: FilterProjectDto) {
    const { status } = filterDto;
    return this.ProjectRepository.find({
      where: { status },
      relations: ['client'],
    });
  }
  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const prj = await this.findOne(id);
    return await this.ProjectRepository.save(
      Object.assign(prj, updateProjectDto),
    );
  }
  async remove(id: number) {
    const timesheets = await this.timesheetService.checkProject(id);
    if (timesheets) {
      throw new BadRequestException(
        'Cannot delete project with associated timesheets',
      );
    }
    return this.ProjectRepository.softDelete(id);
  }
  restore(id: number) {
    return this.ProjectRepository.restore(id);
  }
}
