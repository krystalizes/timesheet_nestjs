import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from 'src/typeorm/entities/Client';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private ClientRepository: Repository<Client>,
  ) {}
  // tạo client
  create(createClientDto: CreateClientDto) {
    return this.ClientRepository.save(createClientDto);
  }
  // get tất cả client
  findAll() {
    return this.ClientRepository.find();
  }
  // get 1 client
  findOne(id: number) {
    return this.ClientRepository.findOneBy({ id });
  }
  // update 1 client
  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id);
    return await this.ClientRepository.save(
      Object.assign(client, updateClientDto),
    );
  }
}
