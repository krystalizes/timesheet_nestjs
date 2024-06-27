import { Injectable } from '@nestjs/common';
import { CreateUserProjectDto } from './dto/create-user_project.dto';
import { UpdateUserProjectDto } from './dto/update-user_project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User_project } from 'src/typeorm/entities/User_project';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserProjectService {
  constructor(
    @InjectRepository(User_project)
    private UserProjectRepository: Repository<User_project>,
  ) {}
  // tạo user_project mới, tạo khi tạo project thì sẽ trong transaction
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
  // tìm các user trong 1 project
  async findAllUserInPrj(id: number) {
    return await this.UserProjectRepository.find({
      select: ['user'],
      where: { project: { id: id } },
      relations: ['user'],
    });
  }
  // tìm các project mà user đang join
  async findAllPrjOfUser(id: number) {
    const userProjects = await this.UserProjectRepository.find({
      where: { user: { id: id } },
      relations: ['project'],
    });
    return userProjects.filter((up) => up.project.status !== 'Inactive');
  }
  // trả về role trong project của user
  async findRoleUser(prj_id: number, user_id: number) {
    return await this.UserProjectRepository.find({
      select: ['role'],
      where: {
        user: { id: user_id },
        project: { id: prj_id },
      },
    });
  }
  // update
  async updateRole(
    prj_id: number,
    user_id: number,
    updateUserProjectDto: UpdateUserProjectDto,
  ) {
    await this.UserProjectRepository.update(
      { user: { id: user_id }, project: { id: prj_id } },
      updateUserProjectDto,
    );
    return this.UserProjectRepository.findOneByOrFail({
      user: { id: user_id },
      project: { id: prj_id },
    });
  }
  // tìm các project mà user là Manager
  async findProjectIsManager(id: number) {
    return await this.UserProjectRepository.find({
      where: {
        user: { id },
        role: 'Manager',
      },
      relations: ['project'],
    });
  }
  // force delete( xoá user ra khỏi project )
  async remove(prj_id: number, user_id: number) {
    return await this.UserProjectRepository.delete({
      user: { id: user_id },
      project: { id: prj_id },
    });
  }
}
