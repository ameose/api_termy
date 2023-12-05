import { Module } from '@nestjs/common';
import { SmartcaptchaService } from './smartcaptcha.service';
import { SmartcaptchaController } from './smartcaptcha.controller';
import { HttpModule } from '@nestjs/axios';
import { PhoneService } from '../phone/phone.service';
import { PhoneController } from '../phone/phone.controller';
import { SmartcaptchaRepository } from './repository/smartcaptcha.repository';
import { PhoneModule } from 'src/phone/phone.module';

@Module({
  controllers: [SmartcaptchaController, PhoneController],
  imports: [HttpModule, PhoneModule],
  providers: [SmartcaptchaService, PhoneService, SmartcaptchaRepository],
})
export class SmartcaptchaModule {}
