import { Injectable } from '@nestjs/common';
import { CreateUserProjectDto } from './dto/create-user_project.dto';
import { UpdateUserProjectDto } from './dto/update-user_project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User_project } from 'src/typeorm/entities/User_project';
import { EntityManager, Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserProjectService {
  constructor(
    @InjectRepository(User_project)
    private UserProjectRepository: Repository<User_project>,
  ) {}
  async create(
    createUserProjectDto: CreateUserProjectDto,
    entityManager?: EntityManager,
  ) {
    if (entityManager) {
      const userProject = entityManager.create(
        User_project,
        createUserProjectDto,
      );
      return await entityManager.save(userProject);
    } else {
      const userProject =
        this.UserProjectRepository.create(createUserProjectDto);
      return await this.UserProjectRepository.save(userProject);
    }
  }
  async findAllUserInPrj(
    id: number,
    options: IPaginationOptions,
  ): Promise<Pagination<User_project>> {
    const queryBuilder = this.UserProjectRepository.createQueryBuilder(
      'user_project',
    )
      .leftJoinAndSelect('user_project.user', 'user')
      .where('user_project.project.id = :id', { id });

    return paginate<User_project>(queryBuilder, options);
  }
  async findAllPrjOfUser(id: number) {
    const userProjects = await this.UserProjectRepository.find({
      where: { user: { id: id } },
      relations: ['project'],
    });
    return userProjects.filter((up) => up.project.status !== 'Inactive');
  }
  async findRoleUser(id: number) {
    return await this.UserProjectRepository.findOne({
      where: { id },
    });
  }
  async updateRole(id: number, updateUserProjectDto: UpdateUserProjectDto) {
    const user_project = await this.findRoleUser(id);
    return await this.UserProjectRepository.save(
      Object.assign(user_project, updateUserProjectDto),
    );
  }
  async findProjectIsManager(id: number) {
    return await this.UserProjectRepository.find({
      where: {
        user: { id },
        role: 'Manager',
      },
      relations: ['project'],
    });
  }
  async remove(id: number) {
    return await this.UserProjectRepository.delete({ id });
  }
}
