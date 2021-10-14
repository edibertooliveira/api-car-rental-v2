import { Module } from '@nestjs/common';
import { CarsController } from './useCases/cars.controller';
import { CarProfileController } from './useCases/carProfile.controller';

@Module({
  controllers: [CarsController, CarProfileController],
})
export class CarsModule {}
