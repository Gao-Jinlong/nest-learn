import { Module } from '@nestjs/common';
import { DecorateService } from './decorate.service';
import { DecorateController } from './decorate.controller';

@Module({
  controllers: [DecorateController],
  providers: [DecorateService],
})
export class DecorateModule {}
