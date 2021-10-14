import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsBoolean,
  IsNumber,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  brand: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  dailyRate: number;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  available: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  licensePlate: string;
}
