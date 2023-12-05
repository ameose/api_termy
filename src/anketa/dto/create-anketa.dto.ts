import { ApiProperty } from '@nestjs/swagger';
import { CreateChildDto } from './create-child.dto';

export class CreateAnketaDto {
  @ApiProperty({
    example: 'string',
    description: 'Телефон',
  })
  phone: string;

  @ApiProperty({
    example: 'string',
    description: 'Имя',
  })
  name: string;

  @ApiProperty({
    example: '2023-12-04T13:55:25.329Z',
    description: 'Дата рождения',
  })
  birthday: string;

  @ApiProperty({
    description: 'Список детей',
    type: [CreateChildDto],
  })
  children: CreateChildDto[];

  @ApiProperty({
    example: '2023-12-04T13:55:25.329Z',
    description: 'Дата доступа',
  })
  dateAccess: string;

  @ApiProperty({
    example: true,
    description: 'Промо-флаг',
  })
  isPromo: boolean;

  @ApiProperty({
    example: 1,
    description: 'Источник анкеты',
  })
  sourceAnketa: number;
}
