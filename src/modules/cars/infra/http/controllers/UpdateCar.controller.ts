import { UpdateCarDTO } from '@modules/cars/dtos/UpdateCarDTO';
import { summaryUpdate } from '@config/constants/docs';
import {
  BAD_REQUEST_RESPONSE,
  conflictResponse,
  NOT_FOUND_RESPONSE,
} from '@config/constants/response';
import {
  Controller,
  Param,
  Put,
  HttpStatus,
  HttpCode,
  Body,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Cars')
@ApiBadRequestResponse({
  description: BAD_REQUEST_RESPONSE,
})
@ApiNotFoundResponse({
  description: NOT_FOUND_RESPONSE,
})
@ApiConflictResponse({
  description: conflictResponse('car'),
})
@Controller('cars/:id')
export class UpdateCarController {
  @ApiOperation({
    summary: summaryUpdate('cars'),
  })
  @ApiBody({
    type: UpdateCarDTO,
  })
  @ApiResponse({})
  @HttpCode(HttpStatus.OK)
  @Put()
  handler(
    @Param('id') carId: string,
    @Body()
    {
      name,
      brand,
      description,
      dailyRate,
      available,
      categoryId,
      licensePlate,
    }: UpdateCarDTO,
  ) {
    return {
      name,
      brand,
      description,
      dailyRate,
      available,
      categoryId,
      licensePlate,
    };
  }
}
