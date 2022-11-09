// Centralized all pure function
import { ApiResponseOptions } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { NormalException } from '@/exception/normal.exception';

export const toSwaggerError = (
  exception: NormalException,
  options?: ApiResponseOptions
) => {
  return {
    content: { 'application/json': { example: exception.toJSON() } },
    ...options,
  };
};

// Share the setup for bootstrap, E2E testing and swagger script
export const initialize = (app: INestApplication) => {
  app.enableVersioning();

  // Enable CORS by default because Swagger UI required
  app.enableCors();

  app.setGlobalPrefix(process.env.BASE_PATH);
};
