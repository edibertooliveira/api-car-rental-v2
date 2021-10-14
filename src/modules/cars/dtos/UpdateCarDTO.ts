import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDTO } from './CreateCarDTO';

export class UpdateCarDTO extends PartialType(CreateCarDTO) {}
