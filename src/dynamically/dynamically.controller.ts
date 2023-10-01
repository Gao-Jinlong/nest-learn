import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { DynamicallyService } from './dynamically.service';
import { CreateDynamicallyDto } from './dto/create-dynamically.dto';
import { UpdateDynamicallyDto } from './dto/update-dynamically.dto';

@Controller('dynamically')
export class DynamicallyController {
  @Inject('DYNAMIC_OPTIONS_CONFIG')
  private readonly options: Record<string, any>;

  constructor(private readonly dynamicallyService: DynamicallyService) {}

  @Post()
  create(@Body() createDynamicallyDto: CreateDynamicallyDto) {
    return this.dynamicallyService.create(createDynamicallyDto);
  }

  @Get()
  findAll() {
    return { mas: this.dynamicallyService.findAll(), options: this.options };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dynamicallyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDynamicallyDto: UpdateDynamicallyDto,
  ) {
    return this.dynamicallyService.update(+id, updateDynamicallyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dynamicallyService.remove(+id);
  }
}
