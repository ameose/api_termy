import { Body, Controller, Post } from '@nestjs/common';
import { SmartcaptchaService } from './smartcaptcha.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('smartcaptcha')
export class SmartcaptchaController {
  constructor(private readonly smartcaptchaService: SmartcaptchaService) {}

  @Post('check')
  @ApiBody({
    schema: { type: 'object', properties: { token: { type: 'string' } } },
  })
  async checkCapcha(@Body('token') token: string) {
    return await this.smartcaptchaService.checkCaptcha(token);
  }
}
