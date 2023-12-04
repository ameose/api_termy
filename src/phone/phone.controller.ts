import { Body, Controller, Post } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('phone')
@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post('sendcode')
  @ApiOperation({
    summary: 'Отправка кода подтверждения на телефон',
    description:
      'Принимает номер телефона и отправляет на него код подтверждения. Используется для верификации номера пользователя.',
  })
  @ApiResponse({ status: 200, description: 'Код успешно отправлен' })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  @ApiBody({
    description: 'Номер телефона',
    type: String,
    schema: { type: 'object', properties: { phone: { type: 'string' } } },
  })
  async sendCode(@Body('phone') phone: string): Promise<object> {
    const context = { phone: phone };
    // this.phoneService.setContext(context);
    // console.log(this.phoneService.getContext());
    const response = await this.phoneService.sendCode(context.phone);
    return response;
  }

  @Post('check')
  @ApiOperation({
    summary: 'Проверка кода подтверждения',
    description:
      'Принимает код подтверждения и проверяет его соответствие сгенерированному коду. Используется для верификации номера телефона пользователя.',
  })
  @ApiResponse({ status: 200, description: 'Код подтверждения верен' })
  @ApiResponse({
    status: 400,
    description: 'Неверный запрос или код подтверждения',
  })
  @ApiBody({
    description: 'Код подтверждения',
    type: String,
    schema: { type: 'object', properties: { code: { type: 'string' } } },
  })
  async check(@Body('code') code: string): Promise<boolean> {
    const data = await this.phoneService.getGeneratedCode();
    // console.log(`${data[0]} ${code}`);

    return data[0].includes(code);
  }
}
