import {
  Controller,
  Param,
  Res,
  Get,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Body,
} from '@nestjs/common';
import { UpdateCarDTO } from 'src/modules/cars/dtos/UpdateCarDto';

@Controller('api/v1/cars/:id')
export class CarProfileController {
  @HttpCode(HttpStatus.OK)
  @Get()
  findOne(@Param('id') carId: string) {
    return [carId];
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  update(
    @Param('id') carId: string,
    @Body()
    {
      name,
      brand,
      description,
      dailyRate,
      available,
      categoryId,
      licensePlate,
    }: UpdateCarDTO,
  ) {
    return {
      name,
      brand,
      description,
      dailyRate,
      available,
      categoryId,
      licensePlate,
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  destroy(@Param('id') carId: string) {
    return [carId];
  }
}
