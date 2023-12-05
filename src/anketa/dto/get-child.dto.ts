import { ApiProperty } from '@nestjs/swagger';

export class GetChildDto {
  @ApiProperty({ description: 'Уникальный идентификатор ребенка' })
  id: string;

  @ApiProperty({ description: 'Имя ребенка' })
  name: string;

  @ApiProperty({ description: 'Дата рождения ребенка' })
  birthday: string;

  @ApiProperty({ description: 'Полное имя и возраст ребенка' })
  fullName: string;

  @ApiProperty({ description: 'Возраст ребенка' })
  age: string;
}
