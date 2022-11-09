import { AppConfig, AppModule } from '@mod/app';
import { Logger, PinoLogger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { clusterize } from '@util/clustering';
import { initialize } from '@util/helper';

const { CLUSTERING, PORT } = process.env;

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    AppConfig.getFastifyInstance(),
    // This logger instance only for logging the app init message (e.g. InstanceLoader),
    // since before booting the app, LoggerModule is not loaded yet
    { logger: new Logger(new PinoLogger(AppConfig.getLoggerConfig()), {}) }
  );

  initialize(app);

  // By default, Fastify only listens localhost, so we should to specify '0.0.0.0'
  app.listen(PORT, '0.0.0.0');
};
if (CLUSTERING === 'true') clusterize(bootstrap);
else bootstrap();
