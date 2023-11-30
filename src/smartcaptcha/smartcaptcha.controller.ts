import { Body, Controller, Post } from '@nestjs/common';
import { SmartcaptchaService } from './smartcaptcha.service';
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PhoneService } from '../phone/phone.service';

@ApiTags('smartcaptcha')
@Controller('smartcaptcha')
export class SmartcaptchaController {
  constructor(
    private readonly smartcaptchaService: SmartcaptchaService,
    private readonly phoneService: PhoneService,
  ) {}

  @Post('check')
  @ApiOperation({
    summary: 'Проверка капчи и отправка кода на телефон',
    description:
      'Проверяет капчу по предоставленному токену. Если капча успешно проверена, отправляет код на указанный номер телефона.',
  })
  @ApiBody({
    description: 'Проверка капчи и отправка кода на телефон',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', description: 'Токен для проверки капчи' },
        phone: {
          type: 'string',
          description: 'Номер телефона для отправки кода',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Код успешно отправлен' })
  @ApiResponse({
    status: 400,
    description: 'Неверный токен или ошибка при отправке кода',
  })
  async checkCaptcha(
    @Body('token') token: string,
    @Body('phone') phone: string,
  ) {
    if (await this.smartcaptchaService.checkCaptcha(token)) {
      return await this.phoneService.sendCode(phone);
    }
    return await this.smartcaptchaService.checkCaptcha(token);
  }

  @Post('verify-phone')
  @ApiOperation({
    summary: 'Проверка кода, отправленного на телефон',
    description:
      'Сравнивает предоставленный код с кодом, сгенерированным на сервере, для верификации номера телефона.',
  })
  @ApiBody({
    description: 'Тело запроса для верификации телефона',
    schema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'Код для верификации, отправленный на телефон',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Верификация успешна (true) или неуспешна (false)',
  })
  @ApiResponse({ status: 400, description: 'Неверный запрос, отсутствует код' })
  async verifyPhone(@Body('code') code: string): Promise<boolean> {
    const generatedCode = await this.phoneService.getGeneratedCode();
    console.log(`${generatedCode} ${code}`);
    return code === generatedCode;
  }
}
