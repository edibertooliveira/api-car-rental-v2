import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDto';
import { Controller, Post, HttpStatus, HttpCode, Body } from '@nestjs/common';

@Controller('cars')
export class CreateCarController {
  @HttpCode(HttpStatus.CREATED)
  @Post()
  handler(
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
