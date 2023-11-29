import { Module } from '@nestjs/common';
import { SmartcaptchaService } from './smartcaptcha.service';
import { SmartcaptchaController } from './smartcaptcha.controller';
import { HttpModule } from '@nestjs/axios';
import { PhoneService } from '../phone/phone.service';
import { PhoneController } from '../phone/phone.controller';

@Module({
  controllers: [SmartcaptchaController, PhoneController],
  imports: [HttpModule],
  providers: [SmartcaptchaService, PhoneService],
})
export class SmartcaptchaModule {}
