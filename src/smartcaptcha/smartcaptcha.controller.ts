import { Body, Controller, Post } from '@nestjs/common';
import { SmartcaptchaService } from './smartcaptcha.service';
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PhoneService } from '../phone/phone.service';
import { SmartcaptchaRepository } from './repository/smartcaptcha.repository';

@ApiTags('smartcaptcha')
@Controller('smartcaptcha')
export class SmartcaptchaController {
  constructor(
    private readonly smartcaptchaService: SmartcaptchaService,
    private readonly phoneService: PhoneService,
    private readonly smartcaptchaRepository: SmartcaptchaRepository,
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
  @ApiResponse({
    status: 200,
    description: 'Код успешно отправлен',
    schema: {
      type: 'object',
      properties: {
        result: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              code: { type: 'string', example: 'OK' },
              messageId: { type: 'string', example: '3783075451500323712' },
              segmentsId: { type: 'null', example: null },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Неверный токен или ошибка при отправке кода',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Неверный токен капчи' },
        error: { type: 'string', example: 'Bad Request' },
        statusCode: { type: 'integer', example: 400 },
      },
    },
  })
  async checkCaptcha(
    @Body('token') token: string,
    @Body('phone') phone: string,
  ) {
    return await this.smartcaptchaService.checkCaptchaAndSendCode(token, phone);
  }
}
