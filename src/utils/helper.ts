import type { NormalException } from '@/exception';
import type { INestApplication } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';

import { NodeEnv } from '@share/enums';
import { Logger } from 'nestjs-pino';

/**
 * Returns the data wrapped by an object with data key.
 */
export const toSwaggerError = (
  exception: NormalException,
  options?: ApiResponseOptions
) => {
  return {
    content: { 'application/json': { example: exception.toJSON() } },
    ...options,
  };
};

/**
 * Encapsulate the init setup for bootstrap, E2E testing and swagger script resued
 */
export const initialize = (app: INestApplication) => {
  const { BASE_PATH, NODE_ENV } = process.env;

  app.useLogger(app.get(Logger));

  app.enableVersioning();

  // For Swagger UI
  if (NODE_ENV === NodeEnv.DEVELOPMENT) app.enableCors();

  // For convenience exclude to set base path when doing e2e test
  if (BASE_PATH && NODE_ENV !== NodeEnv.TEST) app.setGlobalPrefix(BASE_PATH);
};
