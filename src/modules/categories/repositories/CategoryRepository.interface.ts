import { CreateCategoryDTO } from '../dtos/CreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category.entity';

export interface ICategoryRepository {
  create(createCategoryDTO: CreateCategoryDTO): Promise<Category>;
  findById(id: string): Promise<Category | undefined>;
  findByName(name: string): Promise<Category | undefined>;
  delete(id: string): Promise<void>;
  save(category: Category): Promise<Category>;
  findAll(): Promise<Category[]>;
}
