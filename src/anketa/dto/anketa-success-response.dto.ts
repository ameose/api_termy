import { ApiProperty } from '@nestjs/swagger';
import { ResultDto } from './result.dto';

export class AnketaSuccessResponseDto {
  @ApiProperty({ description: 'Результат', type: ResultDto })
  result: ResultDto;

  @ApiProperty({ description: 'Статус выполнения запроса' })
  status: string;

  @ApiProperty({ description: 'Сообщение об ошибке', nullable: true })
  errorMessage: string | null;
}
