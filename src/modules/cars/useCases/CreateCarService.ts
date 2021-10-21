import {
  conflictResponse,
  NOT_FOUND_RESPONSE,
} from '@config/constants/response';
import { CategoryRepository } from '@modules/categories/infra/typeorm/repositories/CategoryRepository.repository';
import { ICategoryRepository } from '@modules/categories/repositories/CategoryRepository.interface';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDTO } from '../dtos/CreateCarDTO';
import Car from '../infra/typeorm/entities/Car.entity';
import { CarRepository } from '../infra/typeorm/repositories/CarRepository.repository';
import { ICarRepository } from '../repositories/CarRepository.interface.';

@Injectable()
export default class CreateCarService {
  constructor(
    @Inject('CAR_REPOSITORY') private carsRepository: ICarRepository, // @Inject('CATEGORY_REPOSITORY') // private categoriesRepository: ICategoryRepository,
  ) {}
  public async execute({
    name,
    brand,
    description,
    dailyRate,
    available,
    categoryId,
    licensePlate,
  }: CreateCarDTO): Promise<Car> {
    const carExists = await this.carsRepository.findByName(name);
    // const categoryExists = await this.categoriesRepository.findById(categoryId);
    // if (!categoryExists) {
    //   throw new NotFoundException(NOT_FOUND_RESPONSE);
    // }
    if (carExists) {
      throw new ConflictException(conflictResponse('car'));
    }
    return this.carsRepository.create({
      name,
      brand,
      description,
      dailyRate,
      available,
      categoryId,
      licensePlate,
    });
  }
}
