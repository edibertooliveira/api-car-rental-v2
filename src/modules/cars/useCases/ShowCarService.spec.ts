import 'reflect-metadata';
import * as faker from 'faker';
import { describe, test, expect } from '@jest/globals';
import { ShowCarService } from '.';
import Car from '../infra/typeorm/entities/Car.entity';
import { Test } from '@nestjs/testing';
import { InMemoryCarRepository } from '../repositories/in-memory/InMemoryCarRepository.repository';
import { InMemoryCategoryRepository } from '@modules/categories/repositories/in-memory/InMemoryCategoryRepository.repository';
import { BadRequestException } from '@nestjs/common';

describe('ShowCarService', () => {
  let inMemoryCarRepository: InMemoryCarRepository;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let showCarService: ShowCarService;
  let car: Car;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ShowCarService,
        { provide: 'CAR_REPOSITORY', useClass: InMemoryCarRepository },
        {
          provide: 'CATEGORY_REPOSITORY',
          useClass: InMemoryCategoryRepository,
        },
      ],
    }).compile();

    showCarService = moduleRef.get<ShowCarService>(ShowCarService);

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

    car = await inMemoryCarRepository.create(carCreateObj);
  });

  describe('impossible to get a car', () => {
    test('If it return "car not found" is an instance of "BadRequestException"', async () => {
      await expect(showCarService.execute('999')).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });

  describe('possible to get a car', () => {
    test('If it returns object type', async () => {
      const result = JSON.stringify(car);
      expect(
        JSON.stringify(await showCarService.execute(car.id)),
      ).toStrictEqual(result);
      expect(typeof car).toBe('object');
    });
  });
});
