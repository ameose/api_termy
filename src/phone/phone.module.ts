import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PhoneController],
  imports: [HttpModule],
  providers: [PhoneService],
})
export class PhoneModule {}
