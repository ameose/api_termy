import { Test, TestingModule } from '@nestjs/testing';
import { AnketaController } from './anketa.controller';
import { AnketaService } from './anketa.service';

describe('AnketaController', () => {
  let controller: AnketaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnketaController],
      providers: [AnketaService],
    }).compile();

    controller = module.get<AnketaController>(AnketaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
