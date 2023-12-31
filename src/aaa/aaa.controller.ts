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
  Inject,
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { RolesGuard } from './aop/RolesGuard';
import { LoggingInterceptor } from './aop/LoggingInterceptor';
import { ValidationPipe } from './aop/ValidationPipe';
import { HttpExceptionFilter } from './aop/HttpExceptionFilter';
import { ForbiddenExceptionFilter } from './aop/ForbiddenException.filter';
import { MyGlobalLogger } from 'src/log/entities/myLogger';
import { DynamicLogger } from 'src/log/entities/dynamic';
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
  constructor(
    private readonly aaaService: AaaService,
    private readonly logger: MyGlobalLogger,
    private readonly dynamicLogger: DynamicLogger,

    // dynamic module exports
    @Inject('DYNAMIC_OPTIONS_CONFIG')
    private readonly options: Record<string, any>,
  ) {}

  @Post()
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }

  @Get()
  @UseFilters(ForbiddenExceptionFilter)
  findAll() {
    // throw new ForbiddenException();
    return { msg: this.aaaService.findAll(), dynamicOptions: this.options };
  }

  @Get('logger')
  testLogger() {
    this.logger.log('log');
    return 'log';
  }
  @Get('dynamicLogger')
  testDynamicLogger() {
    this.dynamicLogger.log('dynamicLogger');
    return 'dynamicLogger';
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
