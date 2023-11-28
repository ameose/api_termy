import { Module } from '@nestjs/common';
import { SmartcaptchaService } from './smartcaptcha.service';
import { SmartcaptchaController } from './smartcaptcha.controller';

@Module({
  controllers: [SmartcaptchaController],
  providers: [SmartcaptchaService],
})
export class SmartcaptchaModule {}
