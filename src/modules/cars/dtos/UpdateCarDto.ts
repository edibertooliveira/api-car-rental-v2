import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDTO } from './CreateCarDto';

export class UpdateCarDTO extends PartialType(CreateCarDTO) {}
