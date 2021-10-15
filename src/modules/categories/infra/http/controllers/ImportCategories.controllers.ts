import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import {
  BAD_REQUEST_RESPONSE,
  createdResponse,
} from '@config/constants/response';
import { summaryCreate } from '@config/constants/docs';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileImportCategoryDTO } from '@modules/categories/dtos/FileImportCategoryDTO';

@ApiTags('Categories')
@ApiBadRequestResponse({
  description: BAD_REQUEST_RESPONSE,
})
@ApiCreatedResponse({
  description: createdResponse('categories'),
})
@Controller('categories')
export class CreateCarController {
  @ApiBody({})
  @ApiOperation({
    summary: summaryCreate('categories'),
  })
  @ApiResponse({})
  @HttpCode(HttpStatus.CREATED)
  @Post('imports')
  @UseInterceptors(FileInterceptor('file'))
  handler(@UploadedFile() file: FileImportCategoryDTO) {
    return { file };
  }
}
