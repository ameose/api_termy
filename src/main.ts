import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { redBright, blueBright, yellowBright } from 'console-log-colors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.Port || 3001;
  const HOST = process.env.HOST || 'localhost';

  await app.listen(PORT, () => {
    console.log(
      blueBright(`Сервер запущен по адресу: `) +
        yellowBright(`http://${HOST}:`) +
        redBright(`${PORT}`),
    );
  });
}
bootstrap();
