import {
  Controller,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { NOT_FOUND_RESPONSE } from '@config/constants/response';
import { summaryDelete } from '@config/constants/docs';

@ApiNoContentResponse({
  description: NOT_FOUND_RESPONSE,
})
@ApiNotFoundResponse({
  description: NOT_FOUND_RESPONSE,
})
@ApiTags('Cars')
@Controller('cars/:id')
export class DestroyCarController {
  @ApiOperation({
    summary: summaryDelete('car'),
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  handler(@Param('id') carId: string) {
    return [carId];
  }
}
