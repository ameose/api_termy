import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PhoneService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private generatedCode: string;
  private userPhone: string;
  private context: any;

  private generateCode(): void {
    this.generatedCode = Math.floor(
      Math.random() * (9999 - 1000 + 1) + 1000,
    ).toString();
  }

  async sendCode(phone: string): Promise<boolean> {
    this.generateCode();

    // console.log(`сгенерированный код ${this.generatedCode}`);
    const url = `${this.configService.get('PHONE_API_URL')}`;
    const data = {
      messages: [
        {
          from: this.configService.get('SENDERS_NAME'),
          to: phone,
          text: `Ваш код ЛЕТО: ${this.generatedCode}`,
        },
      ],
    };
    const headers = {
      Authorization: `Key ${this.configService.get('PHONE_AUTHORISATON_KEY')}`,
    };

    const response$ = this.httpService.post(url, data, { headers });

    return response$
      .pipe(map((response) => response.data.status === 'ok'))
      .toPromise();
  }

  async getGeneratedCode(): Promise<string[]> {
    return [this.generatedCode, this.userPhone];
  }

  setContext(generatedcode: string, userphone: string) {
    this.context = {
      userPhone: userphone,
      generatedCode: generatedcode,
    };
  }

  getContext() {
    return this.context;
  }
}
