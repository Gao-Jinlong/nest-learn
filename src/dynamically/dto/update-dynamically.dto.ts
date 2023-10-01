import { PartialType } from '@nestjs/mapped-types';
import { CreateDynamicallyDto } from './create-dynamically.dto';

export class UpdateDynamicallyDto extends PartialType(CreateDynamicallyDto) {}
