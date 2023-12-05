import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CreateChildDto } from './dto/create-child.dto';

@Injectable()
export class AnketaService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async sendAnketa(
    phone: string,
    name: string,
    birthday: string,
    children: CreateChildDto[],
    dateAccess: string,
    isPromo: boolean,
    sourceAnketa: number,
  ): Promise<any> {
    const url = `${this.configService.get('API_URL')}/Anketa`;

    const data = {
      phone: phone,
      name: name,
      birthday: birthday,
      children: children,
      dateAccess: dateAccess,
      isPromo: isPromo,
      sourceAnketa: sourceAnketa,
    };

    try {
      const response = await this.httpService.post(url, data).toPromise();
      return response.data;
    } catch (error) {
      // Обработка ошибок
      console.error('Ошибка при отправке запроса:', error);
      throw error; // или можно вернуть ошибку в качестве ответа
    }
  }
}
