import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDTO';
import Car from '@modules/cars/infra/typeorm/entities/Car.entity';
import { v4 as uuid } from 'uuid';
import { ICarRepository } from '../CarRepository.interface.';

export class InMemoryCarRepository implements ICarRepository {
  private cars: Car[] = [];

  async create(createCarDto: CreateCarDTO): Promise<Car> {
    const car = new Car();

    const newCar = Object.assign(car, {
      id: uuid(),
      ...createCarDto,
      createdAt: new Date(Date.now()),
    }) as Car;

    this.cars.push(newCar);

    return newCar;
  }

  async save(car: Car): Promise<Car> {
    this.cars.splice(
      this.cars.findIndex((existentCar) => existentCar.id === car.id),
      1,
      car,
    );

    return car;
  }

  async delete(id: string): Promise<void> {
    this.cars.splice(
      this.cars.findIndex((existentCar) => existentCar.id === id),
      1,
    );
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find((existentCar) => existentCar.id === id);
  }

  async findByName(name: string): Promise<Car | undefined> {
    return this.cars.find((existentCar) => existentCar.name === name);
  }

  async findAll(): Promise<Car[]> {
    return this.cars;
  }
}
