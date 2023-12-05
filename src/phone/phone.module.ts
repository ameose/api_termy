import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { HttpModule } from '@nestjs/axios';
import { PhoneRepository } from './repository/phone.repository';

@Module({
  controllers: [PhoneController],
  imports: [HttpModule],
  providers: [PhoneService, PhoneRepository],
  exports: [PhoneRepository],
})
export class PhoneModule {}
