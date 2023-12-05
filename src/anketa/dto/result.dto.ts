import { ApiProperty } from '@nestjs/swagger';
import { GetChildDto } from './get-child.dto';

export class ResultDto {
  @ApiProperty({ description: 'Уникальный номер анкеты' })
  number: number;

  @ApiProperty({ description: 'Телефонный номер' })
  phone: string;

  @ApiProperty({ description: 'Имя' })
  name: string;

  @ApiProperty({ description: 'Дата рождения' })
  birthday: string;

  @ApiProperty({ description: 'Список детей', type: [GetChildDto] })
  children: GetChildDto[];

  @ApiProperty({ description: 'Дата доступа к анкете' })
  dateAccess: string;

  @ApiProperty({ description: 'Флаг промо-акции' })
  isPromo: boolean;

  @ApiProperty({ description: 'Источник анкеты' })
  sourceAnketa: number;
}
