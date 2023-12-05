import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Sms } from '@prisma/client';

@Injectable()
export class SmartcaptchaRepository {
  constructor(private prisma: PrismaService) {}

  async createSmsRecord(phone: string, code: string): Promise<Sms> {
    return this.prisma.sms.create({
      data: {
        phone,
        code,
        updated_at: new Date(),
        // Другие поля по необходимости
      },
    });
  }

  async countSmsForToday(phone: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const count = await this.prisma.sms.count({
      where: {
        phone: phone,
        created_at: {
          gte: today,
        },
      },
    });

    return count;
  }
}
