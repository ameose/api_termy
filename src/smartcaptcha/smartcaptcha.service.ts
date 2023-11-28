import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SmartcaptchaService {
  constructor(private readonly httpService: HttpService) {}

  async checkCaptcha(token: string): Promise<boolean> {
    const url = 'https://smartcaptcha.yandexcloud.net/validate';
    const params = {
      secret: '',
      token,
    };

    const response$ = this.httpService.get(url, { params });

    return response$
      .pipe(map((response) => response.data.status === 'ok'))
      .toPromise();
  }
}
