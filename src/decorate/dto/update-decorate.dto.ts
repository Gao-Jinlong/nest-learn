import { PartialType } from '@nestjs/mapped-types';
import { CreateDecorateDto } from './create-decorate.dto';

export class UpdateDecorateDto extends PartialType(CreateDecorateDto) {}
