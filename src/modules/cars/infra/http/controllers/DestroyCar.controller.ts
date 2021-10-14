import {
  Controller,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NOT_FOUND_RESPONSE } from '@config/constants/response';
import { summaryDelete } from '@config/constants/docs';

@ApiNotFoundResponse({
  description: NOT_FOUND_RESPONSE,
})
@ApiTags('Cars')
@Controller('api/v1/cars/:id')
export class DestroyCarController {
  @ApiOperation({
    summary: summaryDelete('car'),
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  destroy(@Param('id') carId: string) {
    return [carId];
  }
}
