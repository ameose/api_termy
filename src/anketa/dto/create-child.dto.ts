import { ApiProperty } from '@nestjs/swagger';

export class CreateChildDto {
  @ApiProperty({ description: 'Имя ребенка' })
  name: string;

  @ApiProperty({ description: 'Дата рождения ребенка' })
  birthday: string;
}
