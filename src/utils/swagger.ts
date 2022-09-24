import * as fs from 'fs';
import { AppConfig } from '@/app.config';
import { AppModule } from '@/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'tsconfig-paths/register';

/**
 * Generate Swagger JSON Schema offline, it used to deploy the document to other server but not the
 * current service (e.g. GitHub Pages)
 */
(async () => {
  const {
    BASE_PATH,
    npm_package_name,
    npm_package_description,
    npm_package_version,
  } = process.env;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    AppConfig.getFastifyInstance(),
    { logger: false }
  );

  app.enableVersioning();
  app.setGlobalPrefix(BASE_PATH);

  const swaggerDoc = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle(npm_package_name)
      .setDescription(npm_package_description)
      .setVersion(npm_package_version)
      .build()
  );

  // Wrap Google JSON style response + error to Swagger document
  // This method is a bit hacky but should be the only method for now
  const { schemas } = swaggerDoc.components;
  const schemaList = Object.entries(schemas);
  for (let i = 0; i < schemaList.length; i += 1) {
    const [key, value] = schemaList[i];
    if (key.match(/(.*)Res/)) {
      schemas[key] = {
        properties: { data: value },
        required: ['data'],
        type: 'object',
      };
    } else if (key.match(/(.*)Error/)) {
      schemas[key] = {
        properties: { error: value },
        required: ['error'],
        type: 'object',
      };
    }
  }

  fs.writeFileSync(
    `${__filename.slice(__dirname.length + 1, -3)}.json`,
    JSON.stringify(swaggerDoc)
  );

  await app.close();
  process.exit(0);
})();
