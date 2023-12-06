import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PhoneRepository } from './repository/phone.repository';

@Injectable()
export class PhoneService {
  private generatedCode: string;
  private userPhone: string;
  private context: any;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly phoneRepository: PhoneRepository,
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
    // Тестовые данные
    // const response = {
    //   result: [
    //     {
    //       code: 'OK',
    //       messageId: '3782758768290128768',
    //       segmentsId: null,
    //     },
    //   ],
    // };
    // return response;
    return this.sendHttpRequest(data, headers);
  }

  getGeneratedCode(): string {
    return this.generatedCode;
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

  private async sendHttpRequest(data: any, headers: any): Promise<object> {
    const url = this.configService.get('PHONE_API_URL');
    console.log(url);
    console.log(headers);
    console.log(data);
    try {
      const response = await this.httpService
        .post(url, data, { headers })
        .toPromise();
      return response.data;
    } catch (error) {
      console.error('Ошибка при отправке кода:', error);
      throw new HttpException(
        'Ошибка при отправке запроса',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private prepareHeaders() {
    const key = this.configService.get('PHONE_AUTHORIZATON_KEY');
    console.log('ключ');
    console.log(key);
    return {
      'Content-Type': 'application/json',
      Authorization: `Key ${key}`,
    };
  }

  // async getGeneratedCode(): Promise<string[]> {
  //   return [this.generatedCode, this.userPhone];
  // }

  setContext(generatedcode: string, userphone: string) {
    this.context = {
      userPhone: userphone,
      generatedCode: generatedcode,
    };
  }

  getContext() {
    return this.context;
  }

  async verifyPhone(
    phone: string,
    userCode: string,
  ): Promise<{ success: boolean }> {
    try {
      await this.phoneRepository.verifyCode(phone, userCode);
      return { success: true };
    } catch (error) {
      throw new HttpException(
        'Неизвестная ошибка',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
