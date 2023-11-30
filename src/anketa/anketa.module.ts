import { Module } from '@nestjs/common';
import { AnketaService } from './anketa.service';
import { AnketaController } from './anketa.controller';
import { HttpModule } from '@nestjs/axios';
import { PhoneService } from '../phone/phone.service';

@Module({
  controllers: [AnketaController],
  imports: [HttpModule],
  providers: [AnketaService, PhoneService],
})
export class AnketaModule {}
