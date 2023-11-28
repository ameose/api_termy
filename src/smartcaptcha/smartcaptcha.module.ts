import { Module } from '@nestjs/common';
import { SmartcaptchaService } from './smartcaptcha.service';
import { SmartcaptchaController } from './smartcaptcha.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [SmartcaptchaController],
  imports: [HttpModule],
  providers: [SmartcaptchaService],
})
export class SmartcaptchaModule {}
