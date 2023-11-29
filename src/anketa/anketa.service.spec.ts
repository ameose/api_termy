import { Test, TestingModule } from '@nestjs/testing';
import { AnketaService } from './anketa.service';

describe('AnketaService', () => {
  let service: AnketaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnketaService],
    }).compile();

    service = module.get<AnketaService>(AnketaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
