import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDto';
import { Controller, Post, HttpStatus, HttpCode, Body } from '@nestjs/common';

@Controller('api/v1/cars')
export class CreateCarController {
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body()
    {
      name,
      brand,
      description,
      dailyRate,
      categoryId,
      available,
      licensePlate,
    }: CreateCarDTO,
  ) {
    return {
      name,
      brand,
      description,
      dailyRate,
      categoryId,
      available,
      licensePlate,
    };
  }
}
