import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';
import { ENVIRONMENT } from './config/enum/environment.enum';
import { GlobalExceptionFilter } from './config/filters/global-exception.filter';

config();

async function bootstrap() {
  const { PORT, NODE_ENV } = process.env;
  const logger =
    NODE_ENV === ENVIRONMENT.DEVELOPMENT.toString()
      ? new Logger()
      : new Logger('Bootstrap', { timestamp: true });

  const app = await NestFactory.create(AppModule, {
    logger: NODE_ENV !== ENVIRONMENT.TEST.toString() ? logger : false,
  });

  app.enableCors();

  app.enableVersioning({ defaultVersion: '1', type: VersioningType.URI });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      errorHttpStatusCode: 422,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  if (NODE_ENV === ENVIRONMENT.DEVELOPMENT.toString()) {
    const config = new DocumentBuilder()
      .setTitle('Minimal Task API')
      .setDescription('API for minimal task management')
      .setVersion('1.0')
      .addTag('services')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'Bearer',
          bearerFormat: 'JWT',
        },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(PORT ?? 3333);
}

void (async () => {
  await bootstrap();
})();
