import { summaryGetOne } from '@config/constants/docs';
import { NOT_FOUND_RESPONSE } from '@config/constants/response';
import { Controller, Param, Get, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiNotFoundResponse({
  description: NOT_FOUND_RESPONSE,
})
@ApiTags('Cars')
@Controller('cars/:id')
export class ShowCarController {
  @ApiOperation({
    summary: summaryGetOne('cars'),
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  handler(@Param('id') carId: string) {
    return [carId];
  }
}
