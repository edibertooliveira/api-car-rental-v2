import { Module } from '@nestjs/common';
import { PostgresProviderModule } from '@shared/infra/typeorm/provader.module';
import { CarsModule } from './modules/cars/cars.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [CarsModule, CategoriesModule, PostgresProviderModule],
})
export class AppModule {}
