import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common';

@Controller('api/v1/cars')
export class IndexCarsController {
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return ['ok'];
  }
}
