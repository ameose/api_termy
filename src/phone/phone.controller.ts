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
  async sendCode(@Body('phone') phone: string): Promise<void> {
    const context = { phone: phone };
    // this.phoneService.setContext(context);
    // console.log(this.phoneService.getContext());
    await this.phoneService.sendCode(context.phone);
  }
}
