import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDto';
import { Controller, Post, HttpStatus, HttpCode, Body } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import {
  BAD_REQUEST_RESPONSE,
  conflictResponse,
  createdResponse,
} from '@config/constants/response';
import { summaryCreate } from '@config/constants/docs';

@ApiTags('Cars')
@ApiBadRequestResponse({
  description: BAD_REQUEST_RESPONSE,
})
@ApiConflictResponse({
  description: conflictResponse('car'),
})
@ApiCreatedResponse({
  description: createdResponse('cars'),
})
@Controller('api/v1/cars')
export class CreateCarController {
  @ApiBody({
    type: CreateCarDTO,
  })
  @ApiOperation({
    summary: summaryCreate('cars'),
  })
  @ApiResponse({})
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body()
    {
      name,
      brand,
      description,
      dailyRate,
      categoryId,
      available,
      licensePlate,
    }: CreateCarDTO,
  ) {
    return {
      name,
      brand,
      description,
      dailyRate,
      categoryId,
      available,
      licensePlate,
    };
  }
}
