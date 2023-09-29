import { Injectable } from '@nestjs/common';
import { CreateDecorateDto } from './dto/create-decorate.dto';
import { UpdateDecorateDto } from './dto/update-decorate.dto';

@Injectable()
export class DecorateService {
  create(createDecorateDto: CreateDecorateDto) {
    return 'This action adds a new decorate';
  }

  findAll() {
    return `This action returns all decorate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} decorate`;
  }

  update(id: number, updateDecorateDto: UpdateDecorateDto) {
    return `This action updates a #${id} decorate`;
  }

  remove(id: number) {
    return `This action removes a #${id} decorate`;
  }
}
