import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmartcaptchaModule } from './smartcaptcha/smartcaptcha.module';
import { ConfigModule } from '@nestjs/config';
import { AnketaModule } from './anketa/anketa.module';
import { PhoneModule } from './phone/phone.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Сделаем конфигурацию глобальной для всего приложения
    }),
    SmartcaptchaModule,
    AnketaModule,
    PhoneModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
