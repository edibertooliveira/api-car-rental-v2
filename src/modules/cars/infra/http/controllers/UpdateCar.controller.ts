import { UpdateCarDTO } from '@modules/cars/dtos/UpdateCarDto';
import {
  Controller,
  Param,
  Put,
  HttpStatus,
  HttpCode,
  Body,
} from '@nestjs/common';

@Controller('api/v1/cars/:id')
export class UpdateCarController {
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
}
