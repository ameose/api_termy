import { ApiProperty } from '@nestjs/swagger';
import { SendChildDto } from './send-child.dto';

export class SendAnketaDto {
  @ApiProperty({ description: 'Номер анкеты' })
  number: number;

  @ApiProperty({ description: 'Телефон' })
  phone: string;

  @ApiProperty({ description: 'Имя' })
  name: string;

  @ApiProperty({ description: 'Дата рождения' })
  birthday: string;

  @ApiProperty({ description: 'Список детей', type: [SendChildDto] })
  children: SendChildDto[];

  @ApiProperty({ description: 'Дата доступа' })
  dateAccess: string;

  @ApiProperty({ description: 'Промо-флаг' })
  isPromo: boolean;
}
