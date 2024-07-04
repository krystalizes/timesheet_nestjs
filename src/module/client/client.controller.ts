import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Roles } from '../auth/common/decorator/get-role-user.decorator';
import { Role } from '../auth/common/enum/role.enum';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @Roles(Role.Admin)
  @Get('/')
  findAll() {
    return this.clientService.findAll();
  }
  @Roles(Role.Admin)
  @Post('/create')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }
  @Roles(Role.Admin)
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.clientService.findOne(id);
  }
  @Roles(Role.Admin)
  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }
}
