import 'reflect-metadata';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';
import { describe, test, expect } from '@jest/globals';
import { CreateCarService } from '.';
import { CreateCarDTO } from '../dtos/CreateCarDTO';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { InMemoryCarRepository } from '../repositories/in-memory/InMemoryCarRepository.repository';
import { InMemoryCategoryRepository } from '@modules/categories/repositories/in-memory/InMemoryCategoryRepository.repository';

describe('CreateCarService', () => {
  let inMemoryCarRepository: InMemoryCarRepository;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let createCarService: CreateCarService;
  let carCreateObj: CreateCarDTO;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateCarService,
        { provide: 'CAR_REPOSITORY', useClass: InMemoryCarRepository },
        {
          provide: 'CATEGORY_REPOSITORY',
          useClass: InMemoryCategoryRepository,
        },
      ],
    }).compile();

    createCarService = moduleRef.get<CreateCarService>(CreateCarService);

    inMemoryCarRepository =
      moduleRef.get<InMemoryCarRepository>('CAR_REPOSITORY');

    inMemoryCategoryRepository = moduleRef.get<InMemoryCategoryRepository>(
      'CATEGORY_REPOSITORY',
    );

    const category = await inMemoryCategoryRepository.create({
      name: faker.vehicle.model(),
      description: faker.lorem.sentence(),
    });

    carCreateObj = {
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

  describe('impossible to create a car', () => {
    describe('duplicate "name" in the bank', () => {
      test('If it return "Car name already used" is an instance of "ConflictException"', async () => {
        await createCarService.execute(carCreateObj);
        await expect(
          createCarService.execute(carCreateObj),
        ).rejects.toBeInstanceOf(ConflictException);
      });
      test('If it return "Category not found" is an instance of "NotFoundException"', async () => {
        carCreateObj.categoryId = '999';
        await expect(
          createCarService.execute(carCreateObj),
        ).rejects.toBeInstanceOf(NotFoundException);
      });
    });
  });
  describe('possible to create a car', () => {
    test('If key returns "id", "created_at"', async () => {
      const response = await createCarService.execute(carCreateObj);
      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('created_at');
    });
  });
});
