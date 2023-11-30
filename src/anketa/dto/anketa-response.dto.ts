import { ApiProperty } from '@nestjs/swagger';

class ChildDto {
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

export class AnketaResponseDto {
  @ApiProperty({ description: 'Результат' })
  result: {
    number: number;
    phone: string;
    name: string;
    birthday: string;
    children: ChildDto[];
    dateAccess: string;
    isPromo: boolean;
    sourceAnketa: number;
  };

  @ApiProperty({ description: 'Статус выполнения запроса' })
  status: string;

  @ApiProperty({ description: 'Сообщение об ошибке', nullable: true })
  errorMessage: string | null;
}
