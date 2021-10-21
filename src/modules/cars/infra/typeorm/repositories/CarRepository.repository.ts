import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDTO';
import { ICarRepository } from '@modules/cars/repositories/CarRepository.interface.';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Car from '../entities/Car.entity';

export class CarRepository implements ICarRepository {
  constructor(
    @InjectRepository(Car)
    private repository: Repository<Car>,
  ) {}

  public async findByName(name: string): Promise<Car> {
    return this.repository.findOne(name);
  }

  public async create(createCarDTO: CreateCarDTO): Promise<Car> {
    const car = this.repository.create(createCarDTO);

    return this.repository.save(car);
  }

  public async findAll(): Promise<Car[]> {
    return this.repository.find();
  }

  public async findById(id: string): Promise<Car | undefined> {
    return this.repository.findOne(id);
  }

  public async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }

  public async save(car: Car): Promise<Car> {
    return this.repository.save(car);
  }
}
