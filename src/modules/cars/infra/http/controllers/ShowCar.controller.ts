import { summaryGetOne } from '@config/constants/docs';
import {
  NOT_FOUND_RESPONSE,
  SUCCESS_RESPONSE,
} from '@config/constants/response';
import { IndexCar } from '@modules/cars/swagger/IndexCar.swagger';
import { Controller, Param, Get, HttpStatus, HttpCode } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiOkResponse({
  description: SUCCESS_RESPONSE,
})
@ApiNotFoundResponse({
  description: NOT_FOUND_RESPONSE,
})
@ApiTags('Cars')
@Controller('cars/:id')
export class ShowCarController {
  @ApiOperation({
    summary: summaryGetOne('cars'),
  })
  @ApiResponse({
    type: IndexCar,
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  handler(@Param('id') carId: string) {
    return [carId];
  }
}
