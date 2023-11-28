import { Test, TestingModule } from '@nestjs/testing';
import { SmartcaptchaController } from './smartcaptcha.controller';
import { SmartcaptchaService } from './smartcaptcha.service';

describe('SmartcaptchaController', () => {
  let controller: SmartcaptchaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartcaptchaController],
      providers: [SmartcaptchaService],
    }).compile();

    controller = module.get<SmartcaptchaController>(SmartcaptchaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
