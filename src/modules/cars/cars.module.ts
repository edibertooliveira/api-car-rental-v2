import Category from '@modules/categories/infra/typeorm/entities/Category.entity';
import { InMemoryCategoryRepository } from '@modules/categories/repositories/in-memory/InMemoryCategoryRepository.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCarController } from './infra/http/controllers/CreateCar.controller';
import Car from './infra/typeorm/entities/Car.entity';
import { InMemoryCarRepository } from './repositories/in-memory/InMemoryCarRepository.repository';
import CreateCarService from './useCases/CreateCarService';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Category])],
  providers: [
    {
      provide: 'CAR_REPOSITORY',
      useClass: InMemoryCarRepository,
    },
    {
      provide: 'CATEGORY_REPOSITORY',
      useClass: InMemoryCategoryRepository,
    },
    CreateCarService,
  ],
  controllers: [CreateCarController],
})
export class CarsModule {}
