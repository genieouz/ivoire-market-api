import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './commons/config/env';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Clavem API')
    .setDescription('The clavem API description')
    .setVersion('2.0')
    .addTag('Clavem')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
}
bootstrap();
