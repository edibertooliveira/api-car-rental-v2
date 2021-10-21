import Category from '@modules/categories/infra/typeorm/entities/Category.entity';
import { CategoryRepository } from '@modules/categories/infra/typeorm/repositories/CategoryRepository.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCarController } from './infra/http/controllers/CreateCar.controller';
import Car from './infra/typeorm/entities/Car.entity';
import { CarRepository } from './infra/typeorm/repositories/CarRepository.repository';
import CreateCarService from './useCases/CreateCarService';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Category])],
  providers: [
    {
      provide: 'CAR_REPOSITORY',
      useClass: CarRepository,
    },
    {
      provide: 'CATEGORY_REPOSITORY',
      useClass: CategoryRepository,
    },
    CreateCarService,
  ],
  controllers: [CreateCarController],
})
export class CarsModule {}
