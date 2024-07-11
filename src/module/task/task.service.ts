import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/typeorm/entities/Task';
import { EntityManager, Repository } from 'typeorm';
import { FilterProjectDto } from '../project/dto/filter-project.dto';
import { SearchProjectDto } from '../project/dto/search-project.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private TaskRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto, entityManager?: EntityManager) {
    if (entityManager) {
      const task = entityManager.create(Task, createTaskDto);
      return await entityManager.save(task);
    } else {
      const task = this.TaskRepository.create(createTaskDto);
      return await this.TaskRepository.save(task);
    }
  }
  async findTaskInPrj(
    id: number,
    options: IPaginationOptions,
  ): Promise<Pagination<Task>> {
    const queryBuilder = this.TaskRepository.createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .where('task.project.id = :id', { id });

    return paginate<Task>(queryBuilder, options);
  }
  findOne(id: number) {
    return this.TaskRepository.findOne({
      where: { id },
      relations: ['project'],
      withDeleted: true,
    });
  }
  async filterTasks(
    dto: FilterProjectDto,
    options: IPaginationOptions,
  ): Promise<Pagination<Task>> {
    const { status } = dto;
    const queryBuilder = this.TaskRepository.createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .where('task.status = :status', { status });

    return paginate<Task>(queryBuilder, options);
  }
  async searchByName(
    dto: SearchProjectDto,
    options: IPaginationOptions,
  ): Promise<Pagination<Task>> {
    const { input } = dto;
    const queryBuilder = this.TaskRepository.createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .where('task.name LIKE :input', { input: `%${input}%` });

    return paginate<Task>(queryBuilder, options);
  }
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    return await this.TaskRepository.save(Object.assign(task, updateTaskDto));
  }
  delete(id: number) {
    return this.TaskRepository.delete(id);
  }
  remove(id: number) {
    return this.TaskRepository.softDelete(id);
  }
  restore(id: number) {
    return this.TaskRepository.restore(id);
  }
}
