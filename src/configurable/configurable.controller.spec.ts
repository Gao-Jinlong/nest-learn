import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurableController } from './configurable.controller';

describe('ConfigurableController', () => {
  let controller: ConfigurableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurableController],
    }).compile();

    controller = module.get<ConfigurableController>(ConfigurableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
