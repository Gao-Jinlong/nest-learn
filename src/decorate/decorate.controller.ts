import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Optional,
  Inject,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DecorateService } from './decorate.service';
import { CreateDecorateDto } from './dto/create-decorate.dto';
import { UpdateDecorateDto } from './dto/update-decorate.dto';
import { CustomErrorFilter } from './aop/CustomError.filter';

@Controller('decorate')
export class DecorateController {
  constructor(
    @Optional() // 通过 Optional decorate 可以声明为可选注入，即使 IoC 容器没有提供对应依赖也不会报错
    @Inject('notExistService')
    private readonly optionalService: unknown,
    private readonly decorateService: DecorateService,
  ) {}

  @Post()
  create(@Body() createDecorateDto: CreateDecorateDto) {
    return this.decorateService.create(createDecorateDto);
  }

  @Get()
  @UseFilters(CustomErrorFilter) // 错误过滤 filter
  findAll() {
    throw new HttpException('error filter', HttpStatus.BAD_REQUEST);
    return this.decorateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.decorateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDecorateDto: UpdateDecorateDto,
  ) {
    return this.decorateService.update(+id, updateDecorateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.decorateService.remove(+id);
  }
}
