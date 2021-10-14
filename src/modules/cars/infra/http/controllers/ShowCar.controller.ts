import { Controller, Param, Get, HttpStatus, HttpCode } from '@nestjs/common';

@Controller('api/v1/cars/:id')
export class ShowCarController {
  @HttpCode(HttpStatus.OK)
  @Get()
  findOne(@Param('id') carId: string) {
    return [carId];
  }
}
