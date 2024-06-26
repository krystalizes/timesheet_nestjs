import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/typeorm/entities/Task';
import { EntityManager, ILike, Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) 
    private TaskRepository:Repository<Task>
  ){}
  // tạo task mới( nếu là 5 task common được tạo khi tạo project thì có transaction để rollback ) 
  async create(createTaskDto: CreateTaskDto, entityManager?: EntityManager) {
    if (entityManager) {
      const task = entityManager.create(Task, createTaskDto);
      return await entityManager.save(task);
    } else {
      const task = this.TaskRepository.create(createTaskDto);
      return await this.TaskRepository.save(task);
    }
  }
  // tìm các task trong 1 project
  findTaskInPrj(id:number) {
    return this.TaskRepository.find({
      where: { project: { id: id }   },
    });
  }
  // tìm 1 task 
  findOne(id: number) {
    return this.TaskRepository.findOne({
      where: { id },
      relations: ['project'],
      withDeleted:true
    });
  }
  // tìm task theo status
  filterTasks(status: string) {
    return this.TaskRepository.find({ 
      where: {status}, 
      relations: ['project']
    });
  }
  // tìm the theo tên task
  searchByName(input: string) {
    return this.TaskRepository.find({
      where: [
        { name: ILike(`%${input}%`) },
      ],
      relations: ['project'],
    });
  }
  // update
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.TaskRepository.update(id, updateTaskDto);
    return this.TaskRepository.findOneByOrFail({ id });
  }
  // force delete
  delete(id: number) {
    return this.TaskRepository.delete(id);
  }
  // soft delete
  remove(id: number) {
    return this.TaskRepository.softDelete(id);
  }
  // restore from soft delete
  restore(id: number) {
    return this.TaskRepository.restore(id);
  }
}
