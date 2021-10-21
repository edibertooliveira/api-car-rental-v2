import 'reflect-metadata';
import * as faker from 'faker';
import { describe, test, expect } from '@jest/globals';
import { InMemoryCarRepository } from '../repositories/in-memory/InMemoryCarRepository.repository';
import { InMemoryCategoryRepository } from '@modules/categories/repositories/in-memory/InMemoryCategoryRepository.repository';
import { DestroyCarService } from '.';
import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import Car from '../infra/typeorm/entities/Car.entity';

describe('DestroyCarService', () => {
  let inMemoryCarRepository: InMemoryCarRepository;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let destroyCarService: DestroyCarService;
  let car: Car;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DestroyCarService,
        { provide: 'CAR_REPOSITORY', useClass: InMemoryCarRepository },
        {
          provide: 'CATEGORY_REPOSITORY',
          useClass: InMemoryCategoryRepository,
        },
      ],
    }).compile();

    destroyCarService = moduleRef.get<DestroyCarService>(DestroyCarService);

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
      car.id = '999';
      await expect(destroyCarService.execute(car.id)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });
  describe('it is possible to delete a car', () => {
    test('if you successfully delete a car', async () => {
      await destroyCarService.execute(car.id);
      const result = await inMemoryCarRepository.findById(car.id);
      expect(result).not.toBeTruthy();
    });
  });
});
