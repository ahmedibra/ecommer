import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const frontendUrl = configService.get('FRONTEND_URL');
  if (frontendUrl) {
    app.enableCors({
      origin: configService.get('FRONTEND_URL'),
    });
  };
  
  await app.listen(3000);
}
bootstrap();
