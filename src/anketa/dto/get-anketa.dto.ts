import { ApiProperty } from '@nestjs/swagger';

export class GetAnketaDto {
  @ApiProperty({
    description: 'Телефонный номер для поиска анкеты',
    example: '+7(909)090-37-61',
  })
  phone: string;
}
