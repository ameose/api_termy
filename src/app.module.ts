import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmartcaptchaModule } from './smartcaptcha/smartcaptcha.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Сделаем конфигурацию глобальной для всего приложения
    }),
    SmartcaptchaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
