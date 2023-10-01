import { Test, TestingModule } from '@nestjs/testing';
import { DynamicallyService } from './dynamically.service';

describe('DynamicallyService', () => {
  let service: DynamicallyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicallyService],
    }).compile();

    service = module.get<DynamicallyService>(DynamicallyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
