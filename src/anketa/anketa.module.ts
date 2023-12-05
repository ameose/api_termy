import { Module } from '@nestjs/common';
import { AnketaService } from './anketa.service';
import { AnketaController } from './anketa.controller';
import { HttpModule } from '@nestjs/axios';
import { PhoneService } from '../phone/phone.service';
import { PhoneModule } from 'src/phone/phone.module';

@Module({
  controllers: [AnketaController],
  imports: [HttpModule, PhoneModule],
  providers: [AnketaService, PhoneService],
})
export class AnketaModule {}
