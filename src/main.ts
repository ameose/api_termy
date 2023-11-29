import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { redBright, blueBright, yellowBright } from 'console-log-colors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.Port || 3001;
  const HOST = process.env.HOST || 'localhost';

  const config = new DocumentBuilder()
    .setTitle('API Termy')
    .setDescription('Description')
    .setVersion('1.0')
    .addTag('termy')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log(
      blueBright(`Сервер запущен по адресу: `) +
        yellowBright(`http://${HOST}:`) +
        redBright(`${PORT}`),
    );
  });
}
bootstrap();
