import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsBoolean,
  IsNumber,
  MinLength,
} from 'class-validator';

export class CreateCarDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  brand: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  dailyRate: number;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsBoolean()
  @IsNotEmpty()
  available: boolean;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  licensePlate: string;
}
