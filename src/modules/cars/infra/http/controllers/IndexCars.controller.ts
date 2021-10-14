import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common';

@Controller('cars')
export class IndexCarsController {
  @HttpCode(HttpStatus.OK)
  @Get()
  handler() {
    return ['ok'];
  }
}
