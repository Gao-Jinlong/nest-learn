import { Test, TestingModule } from '@nestjs/testing';
import { DecorateService } from './decorate.service';

describe('DecorateService', () => {
  let service: DecorateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecorateService],
    }).compile();

    service = module.get<DecorateService>(DecorateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
