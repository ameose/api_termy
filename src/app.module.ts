import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmartcaptchaModule } from './smartcaptcha/smartcaptcha.module';

@Module({
  imports: [SmartcaptchaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
