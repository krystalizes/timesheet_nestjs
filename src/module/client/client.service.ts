import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from 'src/typeorm/entities/Client';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private ClientRepository: Repository<Client>,
  ) {}
  create(createClientDto: CreateClientDto) {
    return this.ClientRepository.save(createClientDto);
  }
  async findAll(options: IPaginationOptions): Promise<Pagination<Client>> {
    return paginate<Client>(this.ClientRepository, options);
  }
  findOne(id: number) {
    return this.ClientRepository.findOneBy({ id });
  }
  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id);
    return await this.ClientRepository.save(
      Object.assign(client, updateClientDto),
    );
  }
}
