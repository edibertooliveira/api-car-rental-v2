import {
  Controller,
  Get,
  Post,
  HttpStatus,
  HttpCode,
  Body,
} from '@nestjs/common';
import { CreateCarDTO } from 'src/modules/cars/dtos/CreateCarDto';

@Controller('api/v1/cars')
export class CarsController {
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return ['ok'];
  }

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
