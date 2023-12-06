import { BadRequestException, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PhoneService } from 'src/phone/phone.service';
import { SmartcaptchaRepository } from './repository/smartcaptcha.repository';

@Injectable()
export class SmartcaptchaService {
  private readonly SMARTCAPTCHA_SERVER_KEY: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly phoneService: PhoneService,
    private readonly smartcaptchaRepository: SmartcaptchaRepository,
  ) {
    this.SMARTCAPTCHA_SERVER_KEY = this.configService.get<string>(
      'SMARTCAPTCHA_SERVER_KEY',
    );
  }

  async checkCaptcha(token: string): Promise<boolean> {
    const url = 'https://smartcaptcha.yandexcloud.net/validate';
    const params = {
      secret: this.SMARTCAPTCHA_SERVER_KEY,
      token,
    };

    const response$ = this.httpService.get(url, { params });

    return response$
      .pipe(map((response) => response.data.status === 'ok'))
      .toPromise();
  }

  // Проверка капчи и отправка кода
  async checkCaptchaAndSendCode(token: string, phone: string) {
    // Проверка токена капчи
    const isCaptchaValid = await this.checkCaptcha(token);
    if (!isCaptchaValid) {
      throw new BadRequestException('Неверный токен капчи');
    }

    // Получение дневного лимита SMS и проверка количества отправленных SMS
    const dailyLimit = await this.smartcaptchaRepository.getDailySmsLimit();
    const smsCount = await this.smartcaptchaRepository.countSmsForToday(phone);
    // console.log(smsCount);
    // Количеств отправленных смс
    if (smsCount >= dailyLimit) {
      throw new BadRequestException(
        'Лимит SMS исчерпан. Повторите попытку через 24 часа.',
      );
    }

    // Отправка код для проверки телефона
    const sendCodeResult = await this.phoneService.sendCode(phone);
    if (!sendCodeResult) {
      throw new BadRequestException('Ошибка при отправке кода');
    }

    const generateCode = this.phoneService.getGeneratedCode();

    await this.smartcaptchaRepository.createSmsRecord(phone, generateCode);

    return sendCodeResult;
  }
}
