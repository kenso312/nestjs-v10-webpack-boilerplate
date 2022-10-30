import { AppConfig, AppModule } from '@mod/app';
import { Logger, PinoLogger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { clusterize } from '@util/clustering';

const { BASE_PATH, CLUSTERING, PORT } = process.env;

const bootstrap = async () => {
  const INADDR_ANY = '0.0.0.0';

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    AppConfig.getFastifyInstance(),
    // This logger instance only for logging the app init message (e.g. InstanceLoader),
    // since before booting the app, LoggerModule is not loaded yet
    { logger: new Logger(new PinoLogger(AppConfig.getLoggerConfig()), {}) }
  );

  app.enableVersioning();

  // Enable CORS by default because Swagger UI required
  app.enableCors();

  app.setGlobalPrefix(BASE_PATH);

  // By default, Fastify only listens localhost, so we should to specify '0.0.0.0'
  app.listen(PORT, INADDR_ANY);
};
if (CLUSTERING === 'true') clusterize(bootstrap);
else bootstrap();
