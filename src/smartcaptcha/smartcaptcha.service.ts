import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmartcaptchaService {
  private readonly SMARTCAPTCHA_SERVER_KEY: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
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
}
