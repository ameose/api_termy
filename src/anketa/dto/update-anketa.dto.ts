import { PartialType } from '@nestjs/swagger';
import { CreateAnketaDto } from './create-anketa.dto';

export class UpdateAnketaDto extends PartialType(CreateAnketaDto) {}
