import { ApiProperty } from '@nestjs/swagger';

export class FileImportCategoryDTO {
  @ApiProperty()
  fieldname: string;

  @ApiProperty()
  originalname: string;

  @ApiProperty()
  encoding: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  destination: string;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  buffer: Buffer;
}
