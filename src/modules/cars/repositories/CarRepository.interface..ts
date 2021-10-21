import { CreateCarDTO } from '../dtos/CreateCarDTO';
import Car from '../infra/typeorm/entities/Car.entity';

export interface ICarRepository {
  create(createCarDTO: CreateCarDTO): Promise<Car>;
  findById(id: string): Promise<Car | undefined>;
  findByName(name: string): Promise<Car | undefined>;
  delete(id: string): Promise<void>;
  save(car: Car): Promise<Car>;
  findAll(): Promise<Car[]>;
}
