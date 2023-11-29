import { Injectable } from '@nestjs/common';

@Injectable()
export class PhoneService {
  private generatedCode: string;

  private generateCode(): void {
    this.generatedCode = Math.floor(
      Math.random() * (9999 - 1000 + 1) + 1000,
    ).toString();
  }
}
