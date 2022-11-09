import { ApiResponseOptions } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { NormalException } from '@/exception/normal.exception';

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
  app.enableVersioning();

  // Enable CORS by default because Swagger UI required
  app.enableCors();

  app.setGlobalPrefix(process.env.BASE_PATH);
};
