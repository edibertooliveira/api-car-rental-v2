import { summaryGetAll } from '@config/constants/docs';
import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Cars')
@Controller('cars')
export class IndexCarsController {
  @ApiOperation({
    summary: summaryGetAll('cars'),
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  handler() {
    return ['ok'];
  }
}
