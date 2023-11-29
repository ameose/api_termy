import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnketaService } from './anketa.service';
import { CreateAnketaDto } from './dto/create-anketa.dto';
import { UpdateAnketaDto } from './dto/update-anketa.dto';

@Controller('anketa')
export class AnketaController {
  constructor(private readonly anketaService: AnketaService) {}

  @Post()
  create(@Body() createAnketaDto: CreateAnketaDto) {
    return this.anketaService.create(createAnketaDto);
  }

  @Get()
  findAll() {
    return this.anketaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anketaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnketaDto: UpdateAnketaDto) {
    return this.anketaService.update(+id, updateAnketaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anketaService.remove(+id);
  }
}
