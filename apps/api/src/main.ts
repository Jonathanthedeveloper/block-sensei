import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
  });

  // Enable Validation
  app.useGlobalPipes(new ValidationPipe());

  // Enable Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api/');

  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
