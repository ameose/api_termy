import { ApiProperty } from '@nestjs/swagger';

export class ChildDto {
  @ApiProperty({ description: 'Уникальный идентификатор ребенка' })
  id: string;

  @ApiProperty({ description: 'Имя ребенка' })
  name: string;

  @ApiProperty({ description: 'Дата рождения ребенка' })
  birthday: string;

  @ApiProperty({ description: 'Полное имя и возраст ребенка', required: false })
  fullName?: string;

  @ApiProperty({ description: 'Возраст ребенка', required: false })
  age?: string;
}
