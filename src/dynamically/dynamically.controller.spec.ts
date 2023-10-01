import { Test, TestingModule } from '@nestjs/testing';
import { DynamicallyController } from './dynamically.controller';
import { DynamicallyService } from './dynamically.service';

describe('DynamicallyController', () => {
  let controller: DynamicallyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DynamicallyController],
      providers: [DynamicallyService],
    }).compile();

    controller = module.get<DynamicallyController>(DynamicallyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
