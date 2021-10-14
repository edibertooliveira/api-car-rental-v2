import Car from '../infra/typeorm/entities/Car.entity';
import { OmitType } from '@nestjs/swagger';

export class IndexCar extends Car {}
export class CreateCar extends OmitType(Car, ['category']) {}
