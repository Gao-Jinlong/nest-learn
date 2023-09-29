import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';

@Injectable()
export class AaaService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  create(createAaaDto: CreateAaaDto) {
    return 'This action adds a new aaa';
  }

  findAll() {
    return `This action returns all aaa`;
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
