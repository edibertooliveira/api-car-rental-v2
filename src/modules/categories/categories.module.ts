import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Category from './infra/typeorm/entities/Category.entity';
import { CategoryRepository } from './infra/typeorm/repositories/CategoryRepository.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    {
      provide: 'CATEGORY_REPOSITORY',
      useClass: CategoryRepository,
    },
  ],
})
export class CategoriesModule {}
