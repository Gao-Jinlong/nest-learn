import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
import { AaaService } from 'src/aaa/aaa.service';
import { AaaModule } from 'src/aaa/aaa.module';
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
    @Inject(
      // provider 循环引用时，使用 forwardRef
      forwardRef(() => AaaService),
    )
    private aaaService: AaaService,
  ) {}
  create(createBbbDto: CreateBbbDto) {
    return 'This action adds a new bbb';
  }

  findAll() {
    return `This action returns all bbb`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bbb` + this.aaaService.findOne(id);
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
