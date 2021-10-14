import { Controller, Param, Get, HttpStatus, HttpCode } from '@nestjs/common';

@Controller('cars/:id')
export class ShowCarController {
  @HttpCode(HttpStatus.OK)
  @Get()
  handler(@Param('id') carId: string) {
    return [carId];
  }
}
