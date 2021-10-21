import { CreateCategoryDTO } from '@modules/categories/dtos/CreateCategoryDTO';
import Category from '@modules/categories/infra/typeorm/entities/Category.entity';
import { v4 as uuid } from 'uuid';
import { ICategoryRepository } from '../CategoryRepository.interface';

export class InMemoryCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  async create(createCategoryDto: CreateCategoryDTO): Promise<Category> {
    const category = new Category();

    const newCategory = Object.assign(category, {
      id: uuid(),
      ...createCategoryDto,
      createdAt: new Date(Date.now()),
    }) as Category;

    this.categories.push(newCategory);

    return newCategory;
  }

  async save(category: Category): Promise<Category> {
    const updatedCategory = Object.assign(category, {
      updatedAt: new Date().toISOString(),
    });
    this.categories.splice(
      this.categories.findIndex(
        (existentCategory) => existentCategory.id === category.id,
      ),
      1,
      updatedCategory,
    );

    return updatedCategory;
  }

  async delete(id: string): Promise<void> {
    this.categories.splice(
      this.categories.findIndex(
        (existentCategory) => existentCategory.id === id,
      ),
      1,
    );
  }

  async findById(id: string): Promise<Category | undefined> {
    return this.categories.find(
      (existentCategory) => existentCategory.id === id,
    );
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find(
      (existentCategory) => existentCategory.name === name,
    );
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }
}
