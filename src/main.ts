import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { redBright, blueBright, yellowBright } from 'console-log-colors';
import { corsOptionsDelegate } from './cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptionsDelegate);

  const PORT = process.env.Port || 3001;
  const HOST = process.env.HOST || 'localhost';

  const config = new DocumentBuilder()
    .setTitle('API Termy')
    .setDescription('Description')
    .setVersion('1.0')
    // .addTag('termy')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT, () => {
    console.log(
      blueBright(`Сервер запущен по адресу: `) +
        yellowBright(`http://${HOST}:`) +
        redBright(`${PORT}`),
    );
  });
}
bootstrap();
