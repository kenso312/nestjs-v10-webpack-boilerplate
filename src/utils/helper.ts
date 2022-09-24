// Centralized all pure function
import { ApiResponseOptions } from '@nestjs/swagger';
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
