import { Controller, Post, HttpStatus, HttpCode, Body } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/CreateCategoryDto';

@Controller('api/v1/categories')
export class CategoriesController {
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body()
    { name, description }: CreateCategoryDto,
  ) {
    return {
      name,
      description,
    };
  }
}
