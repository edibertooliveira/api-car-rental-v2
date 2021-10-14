import { Module } from '@nestjs/common';
import { CreateCarController } from './infra/http/controllers/CreateCar.controller';
import { DestroyCarController } from './infra/http/controllers/DestroyCar.controller';
import { IndexCarsController } from './infra/http/controllers/IndexCars.controller';
import { ShowCarController } from './infra/http/controllers/ShowCar.controller';
import { UpdateCarController } from './infra/http/controllers/UpdateCar.controller';

@Module({
  controllers: [
    CreateCarController,
    UpdateCarController,
    IndexCarsController,
    ShowCarController,
    DestroyCarController,
  ],
})
export class CarsModule {}
