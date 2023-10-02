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
  Next,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
import { TimeInterceptor } from 'src/aop/time/time.interceptor';

@Controller('bbb')
export class BbbController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private readonly bbbService: BbbService) {}

  @Post()
  create(@Body() createBbbDto: CreateBbbDto) {
    return this.bbbService.create(createBbbDto);
  }

  @Get()
  @UseInterceptors(TimeInterceptor)
  async findAll() {
    // throw new Error('findAll error');
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve('timeout');
    //   }, 2000);
    // });
    return this.bbbService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string, @Next() next, @Res() res) {
    const idNum = +id;
    if (Number.isNaN(idNum)) {
      next();
    } else {
      res.send(this.bbbService.findOne(idNum));
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBbbDto: UpdateBbbDto) {
    return this.bbbService.update(+id, updateBbbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bbbService.remove(+id);
  }

  @Get('hello1')
  hello() {
    return 'hello1';
  }
  @Get('hello2')
  hello2() {
    return 'hello2';
  }
  @Get('hi')
  hi() {
    return 'hi';
  }
  onApplicationBootstrap() {
    console.log('Bbb Controller onApplicationBootstrap');
  }
  onModuleInit() {
    console.log('Bbb Controller onModuleInit');
  }
  onModuleDestroy() {
    console.log('Bbb Controller onModuleDestroy');
  }
  beforeApplicationShutdown() {
    console.log('Bbb Controller beforeApplicationShutdown');
  }
  onApplicationShutdown(signal?: string) {
    console.log('Bbb Controller onApplicationShutdown, signal: ', signal);
  }
}
