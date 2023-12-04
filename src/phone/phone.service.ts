import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PhoneService {
  private generatedCode: string;
  private userPhone: string;
  private context: any;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private generateCode(): string {
    const code = Math.floor(Math.random() * 9000 + 1000).toString();
    this.generatedCode = code; // сохраняем код в переменной экземпляра, если это необходимо
    return code; // возвращаем сгенерированный код
  }

  async sendCode(phone: string): Promise<object> {
    const generatedCode = this.generateCode();
    const data = this.prepareMessageData(phone, generatedCode);
    const headers = this.prepareHeaders();
    const response = {
      result: [
        {
          code: 'OK',
          messageId: '3782758768290128768',
          segmentsId: null,
        },
      ],
    };
    return response;
    // return this.sendHttpRequest(data, headers);
  }

  private prepareMessageData(phone: string, code: string) {
    return {
      messages: [
        {
          from: this.configService.get('SENDERS_NAME'),
          to: phone,
          text: `Ваш код ЛЕТО: ${code}`,
        },
      ],
    };
  }

  private async sendHttpRequest(data: any, headers: any): Promise<string> {
    const url = this.configService.get('PHONE_API_URL');

    const response = {
      result: [
        {
          code: 'OK',
          messageId: '3782758768290128768',
          segmentsId: null,
        },
      ],
    };

    return JSON.stringify(response);
    // try {
    //   const response = await this.httpService
    //     .post(url, data, { headers })
    //     .toPromise();
    //   return response.data.status === 'ok';
    // } catch (error) {
    //   console.error('Ошибка при отправке кода:', error);
    //   return false;
    // }
  }

  private prepareHeaders() {
    return {
      Authorization: `Key ${this.configService.get('PHONE_AUTHORIZATON_KEY')}`,
    };
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
