import 'reflect-metadata';
import { describe, test, expect } from '@jest/globals';
import * as faker from 'faker';
import { ListCarsService } from '.';
import { InMemoryCarRepository } from '../repositories/in-memory/InMemoryCarRepository.repository';
import { InMemoryCategoryRepository } from '@modules/categories/repositories/in-memory/InMemoryCategoryRepository.repository';
import { Test } from '@nestjs/testing';

describe('ListCarsService', () => {
  let inMemoryCarRepository: InMemoryCarRepository;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let listCarsService: ListCarsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ListCarsService,
        { provide: 'CAR_REPOSITORY', useClass: InMemoryCarRepository },
        {
          provide: 'CATEGORY_REPOSITORY',
          useClass: InMemoryCategoryRepository,
        },
      ],
    }).compile();

    listCarsService = moduleRef.get<ListCarsService>(ListCarsService);

    inMemoryCarRepository =
      moduleRef.get<InMemoryCarRepository>('CAR_REPOSITORY');

    inMemoryCategoryRepository = moduleRef.get<InMemoryCategoryRepository>(
      'CATEGORY_REPOSITORY',
    );

    const category = await inMemoryCategoryRepository.create({
      name: faker.vehicle.model(),
      description: faker.lorem.sentence(),
    });

    const carCreateObj = {
      name: faker.vehicle.model(),
      brand: faker.vehicle.manufacturer(),
      description: faker.lorem.sentence(),
      dailyRate: Number(faker.finance.amount()),
      categoryId: category.id,
      available: true,
      licensePlate: `${faker.finance.currencyCode()}-${faker.finance.mask()}`,
    };

    await inMemoryCarRepository.create(carCreateObj);
  });
  describe('possible to list car', () => {
    test('If a list of cars is returned successfully', async () => {
      const response = await listCarsService.execute();
      expect(response).toBeTruthy();
    });
  });
});
