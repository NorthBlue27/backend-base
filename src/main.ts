import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MyLogger } from './core/logger/my-logger.service';

import chalk from 'chalk';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // NEST CREATE
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });
  // API PREFIX
  app.setGlobalPrefix('api/v1');

  // GLOBAL PIPES
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Title')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  // APP .env
  const configService = app.get(ConfigService);
  const HOST = configService.get('HOST');
  const PORT = configService.get('PORT');

  // APP CORS
  app.enableCors();
  
  // APP LISTEN PORT
  await app.listen(process.env.PORT);

  // CONSOLE
  process.env.NODE_ENV !== 'production'
    ? Logger.log(
        `Server ready at http://${HOST}:${chalk
          .hex('#87e8de')
          .bold(`${PORT}`)}`,
        'Bootstrap',
      )
    : Logger.log(
        `Server is listening on port ${chalk.hex('#87e8de').bold(`${PORT}`)}`,
        'Bootstrap',
      );
}

bootstrap();
