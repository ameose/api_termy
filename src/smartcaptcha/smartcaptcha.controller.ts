import { Body, Controller, Post } from '@nestjs/common';
import { SmartcaptchaService } from './smartcaptcha.service';

@Controller('smartcaptcha')
export class SmartcaptchaController {
  constructor(private readonly smartcaptchaService: SmartcaptchaService) {}

  @Post('check')
  async checkCapcha(@Body('token') token: string) {
    return await this.smartcaptchaService.checkCaptcha(token);
  }
}
