import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhoneRepository {
  constructor(private prisma: PrismaService) {}

  async verifyCode(phone: string, userCode: string): Promise<void> {
    const smsEntry = await this.prisma.sms.findFirst({
      where: {
        phone,
        active: false,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    if (!smsEntry) {
      throw new BadRequestException('Код не найден.');
    }

    if (smsEntry.code !== userCode) {
      throw new BadRequestException('Неверный код.');
    }

    const codeAge = new Date().getTime() - smsEntry.created_at.getTime();
    const fifteenMinutes = 15 * 60 * 1000;

    if (codeAge > fifteenMinutes) {
      throw new BadRequestException('Код устарел.');
    }

    await this.prisma.sms.update({
      where: {
        id: smsEntry.id,
      },
      data: {
        active: true,
        updated_at: new Date(),
      },
    });
  }
}
