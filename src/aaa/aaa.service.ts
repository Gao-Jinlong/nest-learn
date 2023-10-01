import {
  BeforeApplicationShutdown,
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
  forwardRef,
} from '@nestjs/common';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { BbbService } from 'src/bbb/bbb.service';

@Injectable()
export class AaaService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(
    @Inject(
      // provider 循环引用时，使用 forwardRef
      forwardRef(() => BbbService),
    )
    private bbbService: BbbService,
  ) {}
  create(createAaaDto: CreateAaaDto) {
    return 'This action adds a new aaa';
  }

  findAll() {
    return `This action returns all aaa` + this.bbbService.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} aaa`;
  }

  update(id: number, updateAaaDto: UpdateAaaDto) {
    return `This action updates a #${id} aaa`;
  }

  remove(id: number) {
    return `This action removes a #${id} aaa`;
  }
  onModuleInit() {
    console.log('Aaa Service onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('Aaa Service onApplicationBootstrap');
  }
  onModuleDestroy() {
    console.log('Aaa Service onModuleDestroy');
  }
  beforeApplicationShutdown() {
    console.log('Aaa Service beforeApplicationShutdown');
  }
  onApplicationShutdown(signal?: string) {
    console.log('Aaa Service onApplicationShutdown, signal: ', signal);
  }
}
