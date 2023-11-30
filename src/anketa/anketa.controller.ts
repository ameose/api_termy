import { Body, Controller, Post } from '@nestjs/common';
import { AnketaService } from './anketa.service';
import { PhoneService } from '../phone/phone.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

interface Child {
  id: string;
  name: string;
  birthday: string;
}

@Controller('anketa')
export class AnketaController {
  constructor(
    private readonly anketaService: AnketaService,
    private readonly phoneService: PhoneService,
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Post('sendAnketa')
  async sendAnketa(
    @Body('number') number: number,
    @Body('phone') phone: string,
    @Body('name') name: string,
    @Body('birthday') birthday: string,
    @Body('children') children: Child[],
    @Body('dateAccess') dateAccess: string,
    @Body('isPromo') isPromo: boolean,
  ) {
    await this.anketaService.sendAnketa(
      number,
      phone,
      name,
      birthday,
      children,
      dateAccess,
      isPromo,
    );
  }

  @Post('getAnketa')
  async getAnketa(@Body('phone') phone: string) {
    const url = `${this.configService.get('API_URL')}/Anketa/${phone
      .replace('+7', '')
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')}`;
    const response = await this.http.get(url);
    return response;
  }
}
