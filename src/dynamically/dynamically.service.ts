import { Injectable } from '@nestjs/common';
import { CreateDynamicallyDto } from './dto/create-dynamically.dto';
import { UpdateDynamicallyDto } from './dto/update-dynamically.dto';

@Injectable()
export class DynamicallyService {
  create(createDynamicallyDto: CreateDynamicallyDto) {
    return 'This action adds a new dynamically';
  }

  findAll() {
    return `This action returns all dynamically`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dynamically`;
  }

  update(id: number, updateDynamicallyDto: UpdateDynamicallyDto) {
    return `This action updates a #${id} dynamically`;
  }

  remove(id: number) {
    return `This action removes a #${id} dynamically`;
  }
}
