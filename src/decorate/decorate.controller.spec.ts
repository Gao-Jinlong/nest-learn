import { Test, TestingModule } from '@nestjs/testing';
import { DecorateController } from './decorate.controller';
import { DecorateService } from './decorate.service';

describe('DecorateController', () => {
  let controller: DecorateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DecorateController],
      providers: [DecorateService],
    }).compile();

    controller = module.get<DecorateController>(DecorateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
