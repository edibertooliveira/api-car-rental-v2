import { summaryGetAll } from '@config/constants/docs';
import { SUCCESS_RESPONSE } from '@config/constants/response';
import { IndexCar } from '@modules/cars/swagger/IndexCar.swagger';
import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiOkResponse({
  description: SUCCESS_RESPONSE,
})
@ApiTags('Cars')
@Controller('cars')
export class IndexCarsController {
  @ApiOperation({
    summary: summaryGetAll('cars'),
  })
  @ApiResponse({
    type: IndexCar,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  handler() {
    return ['ok'];
  }
}
