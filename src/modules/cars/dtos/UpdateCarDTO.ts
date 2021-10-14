import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCarDTO } from './CreateCarDTO';

export class UpdateCarDTO extends PartialType(CreateCarDTO) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  dailyRate: number;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  available: boolean;

  @ApiProperty()
  licensePlate: string;
}
