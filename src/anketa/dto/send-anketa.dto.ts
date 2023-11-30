import { ApiProperty } from '@nestjs/swagger';

class ChildDto {
  @ApiProperty({ description: 'ID ребенка' })
  id: string;

  @ApiProperty({ description: 'Имя ребенка' })
  name: string;

  @ApiProperty({ description: 'Дата рождения ребенка' })
  birthday: string;
}

export class SendAnketaDto {
  @ApiProperty({ description: 'Номер анкеты' })
  number: number;

  @ApiProperty({ description: 'Телефон' })
  phone: string;

  @ApiProperty({ description: 'Имя' })
  name: string;

  @ApiProperty({ description: 'Дата рождения' })
  birthday: string;

  @ApiProperty({ description: 'Список детей', type: [ChildDto] })
  children: ChildDto[];

  @ApiProperty({ description: 'Дата доступа' })
  dateAccess: string;

  @ApiProperty({ description: 'Промо-флаг' })
  isPromo: boolean;
}
