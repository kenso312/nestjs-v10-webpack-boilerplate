import { AppModule } from '@/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: process.env.DEBUG === 'true' })
  );

  app.enableVersioning();

  app.setGlobalPrefix('api');

  // Allowing to do validation through DTO
  app.useGlobalPipes(new ValidationPipe());

  // Setup alternative port to -1 to ensure the app can read the env data.
  // By default, Fastify only listens localhost, so we should specify '0.0.0.0'
  await app.listen(process.env.PORT || -1, '0.0.0.0');
})();
