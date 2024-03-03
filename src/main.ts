import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Minigame API')
    .setDescription(
      'API related to minigames win record and schedule on the minigame website',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('specs', app, document);

  app.useStaticAssets(join(process.cwd(), '/src/public'));

  await app.listen(process.env.PORT);
  app.init();
}
bootstrap();
