import { Module } from '@nestjs/common';
import { CarsModule } from './modules/cars/cars.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [CarsModule, CategoriesModule],
})
export class AppModule {}
