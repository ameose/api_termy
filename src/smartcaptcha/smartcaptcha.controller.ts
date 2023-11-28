import { Controller } from '@nestjs/common';
import { SmartcaptchaService } from './smartcaptcha.service';

@Controller('smartcaptcha')
export class SmartcaptchaController {
  constructor(private readonly smartcaptchaService: SmartcaptchaService) {}
}
