import { ApiProperty } from '@nestjs/swagger';

export class SendChildDto {
  @ApiProperty({ description: 'Имя ребенка' })
  name: string;

  @ApiProperty({ description: 'Дата рождения ребенка' })
  birthday: string;
}
