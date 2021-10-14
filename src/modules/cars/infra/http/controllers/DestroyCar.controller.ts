import {
  Controller,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

@Controller('api/v1/cars/:id')
export class DestroyCarController {
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  destroy(@Param('id') carId: string) {
    return [carId];
  }
}
