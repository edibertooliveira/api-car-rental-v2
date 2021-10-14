import {
  Controller,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

@Controller('cars/:id')
export class DestroyCarController {
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  handler(@Param('id') carId: string) {
    return [carId];
  }
}
