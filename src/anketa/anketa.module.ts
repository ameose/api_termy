import { Module } from '@nestjs/common';
import { AnketaService } from './anketa.service';
import { AnketaController } from './anketa.controller';

@Module({
  controllers: [AnketaController],
  providers: [AnketaService],
})
export class AnketaModule {}
