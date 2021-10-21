import { CreateCategoryDTO } from '@modules/categories/dtos/CreateCategoryDTO';
import { ICategoryRepository } from '@modules/categories/repositories/CategoryRepository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Category from '../entities/Category.entity';

export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  public async findByName(name: string): Promise<Category> {
    return this.repository.findOne(name);
  }

  public async create(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
    const category = this.repository.create(createCategoryDTO);

    return this.repository.save(category);
  }

  public async findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  public async findById(id: string): Promise<Category | undefined> {
    return this.repository.findOne(id);
  }

  public async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }

  public async save(category: Category): Promise<Category> {
    return this.repository.save(category);
  }
}
