import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
  UseGuards,
  UseInterceptors,
  ParseIntPipe,
  UsePipes,
  UseFilters,
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { RolesGuard } from './aop/RolesGuard';
import { LoggingInterceptor } from './aop/LoggingInterceptor';
import { ValidationPipe } from './aop/ValidationPipe';
import { HttpExceptionFilter } from './aop/HttpExceptionFilter';
@Controller('aaa')
@UseGuards(RolesGuard) // 路由守卫
@UseInterceptors(new LoggingInterceptor()) // 拦截器
@UsePipes(ValidationPipe) // 管道
@UseFilters(new HttpExceptionFilter()) // 异常过滤
export class AaaController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private readonly aaaService: AaaService) {}

  @Post()
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }

  @Get()
  findAll() {
    return this.aaaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    console.log('typeof id after ParseIntPipe: ', typeof id);
    return this.aaaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(+id, updateAaaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aaaService.remove(+id);
  }

  onApplicationBootstrap() {
    console.log('Aaa Controller onApplicationBootstrap');
  }
  onModuleInit() {
    console.log('Aaa Controller onModuleInit');
  }
  onModuleDestroy() {
    console.log('Aaa Controller onModuleDestroy');
  }
  beforeApplicationShutdown() {
    console.log('Aaa Controller beforeApplicationShutdown');
  }
  onApplicationShutdown(signal?: string) {
    console.log('Aaa Controller onApplicationShutdown, signal: ', signal);
  }
}
