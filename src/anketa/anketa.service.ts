import { Injectable } from '@nestjs/common';
import { CreateAnketaDto } from './dto/create-anketa.dto';
import { UpdateAnketaDto } from './dto/update-anketa.dto';

@Injectable()
export class AnketaService {
  create(createAnketaDto: CreateAnketaDto) {
    return 'This action adds a new anketa';
  }

  findAll() {
    return `This action returns all anketa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} anketa`;
  }

  update(id: number, updateAnketaDto: UpdateAnketaDto) {
    return `This action updates a #${id} anketa`;
  }

  remove(id: number) {
    return `This action removes a #${id} anketa`;
  }
}
