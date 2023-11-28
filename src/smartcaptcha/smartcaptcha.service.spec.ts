import { Test, TestingModule } from '@nestjs/testing';
import { SmartcaptchaService } from './smartcaptcha.service';

describe('SmartcaptchaService', () => {
  let service: SmartcaptchaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartcaptchaService],
    }).compile();

    service = module.get<SmartcaptchaService>(SmartcaptchaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
