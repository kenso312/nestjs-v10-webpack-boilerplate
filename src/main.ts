import {
  AllExceptionFilter,
  ThrottlerExceptionFilter,
  ValidationExceptionFilter,
} from './filter/_index';
import { AppModule } from '@/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { ResponseInterceptor } from '@/interceptor/response.interceptor';
import { ValidationPipe } from '@nestjs/common';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: process.env.DEBUG === 'true' })
  );

  // https://docs.nestjs.com/techniques/versioning#versioning
  app.enableVersioning();

  // Enable this if you have CORS issue in local development
  // app.enableCors();

  app.setGlobalPrefix('api');

  // Allowing to do validation through DTO
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(
    new AllExceptionFilter(),
    new ThrottlerExceptionFilter(),
    new ValidationExceptionFilter()
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  // Setup alternative port to -1 to ensure the app can read the env data.
  // By default, Fastify only listens localhost, so we should to specify '0.0.0.0'
  await app.listen(process.env.PORT || -1, '0.0.0.0');
})();
