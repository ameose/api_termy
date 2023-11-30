import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AnketaService } from './anketa.service';
import { PhoneService } from '../phone/phone.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { SendAnketaDto } from './dto/send-anketa.dto';
import { GetAnketaDto } from './dto/get-anketa.dto';
import { AnketaResponseDto } from './dto/anketa-response.dto';

interface Child {
  id: string;
  name: string;
  birthday: string;
}

@ApiTags('anketa')
@Controller('anketa')
export class AnketaController {
  constructor(
    private readonly anketaService: AnketaService,
    private readonly phoneService: PhoneService,
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Отправка анкеты' })
  @ApiResponse({ status: 200, description: 'Анкета успешно отправлена' })
  @ApiBadRequestResponse({ description: 'Неверный запрос' })
  @ApiBody({ type: SendAnketaDto })
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

  @ApiOperation({ summary: 'Получение анкеты' })
  @ApiOkResponse({
    status: 200,
    description: 'Анкета успешно получена',
    type: AnketaResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Неверный запрос' })
  @ApiNotFoundResponse({ description: 'Анкета не найдена' })
  @ApiBody({ type: GetAnketaDto })
  @Post('getAnketa')
  async getAnketa(@Body() getAnketaDto: GetAnketaDto) {
    // Очистка номера телефона от нецифровых символов
    const phone = getAnketaDto.phone.replace(/\D/g, '');

    // Формирование URL с использованием очищенного номера телефона
    const url = `${this.configService.get('API_URL')}/Anketa/${phone}`;

    try {
      const response = await this.http.get(url).toPromise();
      return response.data; // Предполагая, что данные соответствуют AnketaResponseDto
    } catch (error) {
      throw new HttpException('Анкета не найдена', HttpStatus.NOT_FOUND);
    }
  }
}
