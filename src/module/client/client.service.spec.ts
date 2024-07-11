import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from '../../typeorm/entities/Client';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

describe('ClientService', () => {
  let Service: ClientService;
  const mockClientRepository = {
    save: jest
      .fn()
      .mockImplementation((dto: CreateClientDto) =>
        Promise.resolve({ id: Date.now(), ...dto }),
      ),

    findOneBy: jest.fn().mockImplementation((o) => {
      return {
        id: o.id,
        name: 'Client Name',
        code: 'Client Code',
        address: 'Client Address',
        email: 'client@example.com',
        phone: '1234567890',
        created_at: new Date(),
        updated_at: new Date(),
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockClientRepository,
        },
      ],
    }).compile();

    Service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(Service).toBeDefined();
  });
  describe('create', () => {
    it('should create a client and return it', async () => {
      const createClientDto: CreateClientDto = {
        name: 'test',
        code: 't',
        address: 'Hanoi',
        email: 'a@gmail.com',
        phone: '123456878',
      };

      expect(await Service.create(createClientDto)).toEqual({
        id: expect.any(Number),
        ...createClientDto,
      });
      expect(mockClientRepository.save).toHaveBeenCalledWith(createClientDto);
    });
  });
  describe('findOne', () => {
    it('should return a single client', async () => {
      const id = 1;
      const result = {
        id,
        name: 'Client Name',
        code: 'Client Code',
        address: 'Client Address',
        email: 'client@example.com',
        phone: '1234567890',
        created_at: new Date(),
        updated_at: new Date(),
      };
      expect(await Service.findOne(id)).toEqual(result);
      expect(mockClientRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });
  describe('update', () => {
    it('should update a client', async () => {
      const id = 1;
      const updateClientDto: UpdateClientDto = {
        name: 'Updated Client Name',
        address: 'Updated Client Address',
        email: 'updated_client@example.com',
        phone: '9876543210',
      };
      const existingClient = {
        id,
        name: 'Client Name',
        code: 'Client Code',
        address: 'Client Address',
        email: 'client@example.com',
        phone: '1234567890',
        created_at: new Date(),
        updated_at: new Date(),
      };
      const updatedClient = {
        ...existingClient,
        ...updateClientDto,
      };
      mockClientRepository.findOneBy.mockResolvedValueOnce(existingClient);
      mockClientRepository.save.mockResolvedValueOnce(updatedClient);
      expect(await Service.update(id, updateClientDto)).toEqual(updatedClient);
      expect(mockClientRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockClientRepository.save).toHaveBeenCalledWith(updatedClient);
    });
  });
});
