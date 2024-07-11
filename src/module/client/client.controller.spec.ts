import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

describe('ClientController', () => {
  let controller: ClientController;
  const mockClientService = {
    create: jest.fn().mockImplementation((dto: CreateClientDto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((id, dto: UpdateClientDto) => {
      return {
        id,
        ...dto,
      };
    }),
    findOne: jest.fn().mockImplementation((id: number) => {
      return {
        id,
        name: 'Client Name',
        code: 'Client Code',
        address: 'Client Address',
        email: 'client@example.com',
        phone: '1234567890',
        created_at: new Date(),
        updated_at: new Date(),
      };
    }),
    findAll: jest.fn().mockImplementation(() => {
      return Promise.resolve({
        items: [
          {
            id: 1,
            name: 'Client 1',
            code: 'C1',
            address: 'Address 1',
            email: 'client1@example.com',
            phone: '1234567890',
          },
          {
            id: 2,
            name: 'Client 2',
            code: 'C2',
            address: 'Address 2',
            email: 'client2@example.com',
            phone: '0987654321',
          },
        ],
        meta: {
          totalItems: 2,
          itemCount: 2,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
        links: {
          first: '/client?page=1',
          previous: '',
          next: '',
          last: '/client?page=1',
        },
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService],
    })
      .overrideProvider(ClientService)
      .useValue(mockClientService)
      .compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a client', async () => {
      const createClientDto: CreateClientDto = {
        name: 'test',
        code: 't',
        address: 'Hanoi',
        email: 'a@gmail.com',
        phone: '123456878',
      };

      expect(await controller.create(createClientDto)).toEqual({
        id: expect.any(Number),
        ...createClientDto,
      });
      expect(mockClientService.create).toHaveBeenCalledWith(createClientDto);
    });
  });
  describe('update', () => {
    it('should update a client', async () => {
      const dto = { name: 'john' };
      expect(await controller.update(1, dto)).toEqual({
        id: 1,
        ...dto,
      });
      expect(mockClientService.update).toHaveBeenCalled();
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

      expect(await controller.findOne(id)).toEqual(result);
      expect(mockClientService.findOne).toHaveBeenCalledWith(id);
    });
  });
  describe('findAll', () => {
    it('should return a paginated list of clients', async () => {
      const result = await controller.findAll(1, 10);
      expect(result.items).toHaveLength(2);
      expect(result.meta.totalItems).toBe(2);
      expect(result.meta.itemCount).toBe(2);
      expect(result.meta.itemsPerPage).toBe(10);
      expect(result.meta.totalPages).toBe(1);
      expect(result.meta.currentPage).toBe(1);
      expect(result.links.first).toBe('/client?page=1');
      expect(result.links.previous).toBe('');
      expect(result.links.next).toBe('');
      expect(result.links.last).toBe('/client?page=1');
      expect(mockClientService.findAll).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
        route: `/client/`,
      });
    });
  });
});
