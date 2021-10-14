import { Module } from '@nestjs/common';
import { CategoriesController } from './useCases/categories.controller';

@Module({
  controllers: [CategoriesController],
})
export class CategoriesModule {}
