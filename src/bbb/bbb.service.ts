import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
import { AaaService } from 'src/aaa/aaa.service';
@Injectable()
export class BbbService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(
    // 导入服务
    private aaaService: AaaService,
  ) {}
  create(createBbbDto: CreateBbbDto) {
    return 'This action adds a new bbb';
  }

  findAll() {
    return `This action returns all bbb` + this.aaaService.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} bbb`;
  }

  update(id: number, updateBbbDto: UpdateBbbDto) {
    return `This action updates a #${id} bbb`;
  }

  remove(id: number) {
    return `This action removes a #${id} bbb`;
  }

  onApplicationBootstrap() {
    console.log('Bbb Service onApplicationBootstrap');
  }
  onModuleInit() {
    console.log('Bbb Service onModuleInit');
  }
  onModuleDestroy() {
    console.log('Bbb Service onModuleDestroy');
  }
  beforeApplicationShutdown() {
    console.log('Bbb Service beforeApplicationShutdown');
  }
  onApplicationShutdown(signal?: string) {
    console.log('Bbb Service onApplicationShutdown, signal: ', signal);
  }
}
