import { UpdateCarDTO } from '@modules/cars/dtos/UpdateCarDTO';
import {
  Controller,
  Param,
  Put,
  HttpStatus,
  HttpCode,
  Body,
} from '@nestjs/common';

@Controller('cars/:id')
export class UpdateCarController {
  @HttpCode(HttpStatus.OK)
  @Put()
  handler(
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
}
