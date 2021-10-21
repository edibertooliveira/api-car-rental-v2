import 'reflect-metadata';
import * as faker from 'faker';
import { Test } from '@nestjs/testing';
import { describe, test, expect } from '@jest/globals';
import { InMemoryCarRepository } from '../repositories/in-memory/InMemoryCarRepository.repository';
import { InMemoryCategoryRepository } from '@modules/categories/repositories/in-memory/InMemoryCategoryRepository.repository';
import { CreateCarDTO } from '../dtos/CreateCarDTO';
import { ConflictException, NotFoundException } from '@nestjs/common';
import Car from '../infra/typeorm/entities/Car.entity';
import { UpdateCarService } from '.';

describe('UpdateCarService', () => {
  let inMemoryCarRepository: InMemoryCarRepository;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let updateCarService: UpdateCarService;
  let carCreateObj: CreateCarDTO[];
  let car: Car;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateCarService,
        { provide: 'CAR_REPOSITORY', useClass: InMemoryCarRepository },
        {
          provide: 'CATEGORY_REPOSITORY',
          useClass: InMemoryCategoryRepository,
        },
      ],
    }).compile();

    updateCarService = moduleRef.get<UpdateCarService>(UpdateCarService);

    inMemoryCarRepository =
      moduleRef.get<InMemoryCarRepository>('CAR_REPOSITORY');

    inMemoryCategoryRepository = moduleRef.get<InMemoryCategoryRepository>(
      'CATEGORY_REPOSITORY',
    );

    const category = await inMemoryCategoryRepository.create({
      name: faker.vehicle.model(),
      description: faker.lorem.sentence(),
    });

    carCreateObj.push({
      name: faker.vehicle.model(),
      brand: faker.vehicle.manufacturer(),
      description: faker.lorem.sentence(),
      dailyRate: Number(faker.finance.amount()),
      categoryId: category.id,
      available: true,
      licensePlate: `${faker.finance.currencyCode()}-${faker.finance.mask()}`,
    });

    carCreateObj.push({
      name: faker.vehicle.model(),
      brand: faker.vehicle.manufacturer(),
      description: faker.lorem.sentence(),
      dailyRate: Number(faker.finance.amount()),
      categoryId: category.id,
      available: true,
      licensePlate: `${faker.finance.currencyCode()}-${faker.finance.mask()}`,
    });

    car = await inMemoryCarRepository.create(carCreateObj[0]);
  });

  describe('impossible to get a car', () => {
    test('If it return "car not found" is an instance of "NotFoundException"', async () => {
      car.id = '999';
      await expect(updateCarService.execute(car)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
  describe('it is possible to get a car', () => {
    describe('duplicate "name" in the bank', () => {
      test('If it return "Car name already used" is an instance of "ConflictException"', async () => {
        const car = await inMemoryCarRepository.create({
          ...carCreateObj[0],
          name: faker.vehicle.model(),
        });
        const newNameCar = { ...car, name: carCreateObj[0].name };
        await expect(
          updateCarService.execute(newNameCar),
        ).rejects.toBeInstanceOf(ConflictException);
      });
    });
    test('If it return "Category not found" is an instance of "NotFoundException"', async () => {
      car.categoryId = '999';
      await expect(updateCarService.execute(car)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
  describe('it is possible to change a car', () => {
    test('if the "name" field does not return false', async () => {
      await expect(
        updateCarService.execute({ ...car, name: null }),
      ).resolves.not.toHaveProperty('name', null);
    });
    test('if the "brand" field does not return false', async () => {
      await expect(
        updateCarService.execute({ ...car, brand: null }),
      ).resolves.not.toHaveProperty('brand', null);
    });
    test('if the "description" field does not return false', async () => {
      await expect(
        updateCarService.execute({ ...car, description: null }),
      ).resolves.not.toHaveProperty('description', null);
    });
    test('if the "dailyRate" field does not return false', async () => {
      await expect(
        updateCarService.execute({ ...car, dailyRate: null }),
      ).resolves.not.toHaveProperty('dailyRate', null);
    });
    test('if the "categoryId" field does not return false', async () => {
      await expect(
        updateCarService.execute({ ...car, categoryId: null }),
      ).resolves.not.toHaveProperty('categoryId', null);
    });
    test('if the "licensePlate" field does not return false "licensePlate"', async () => {
      await expect(
        updateCarService.execute({ ...car, licensePlate: null }),
      ).resolves.not.toHaveProperty('licensePlate', null);
    });
    test('if fields have been updated successfully', async () => {
      const category = await inMemoryCategoryRepository.create({
        name: faker.vehicle.model(),
        description: faker.lorem.sentence(),
      });
      const result = await updateCarService.execute({
        id: car.id,
        ...carCreateObj[1],
        categoryId: category.id,
      } as Car);
      expect(result).not.toHaveProperty('name', car.name);
      expect(result).not.toHaveProperty('brand', car.brand);
      expect(result).not.toHaveProperty('description', car.description);
      expect(result).not.toHaveProperty('dailyRate', car.dailyRate);
      expect(result).not.toHaveProperty('categoryId', car.categoryId);
      expect(result).not.toHaveProperty('licensePlate', car.licensePlate);
    });
  });
});
