import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { FastifyReply } from 'fastify';

import { NormalException } from '@/exception';
import { Catch, HttpStatus, Logger } from '@nestjs/common';
import { ValidationError } from 'class-validator';

const getErrorMsg = (error: ValidationError) => {
  let root = error;
  while (root.children.length > 0) {
    [root] = root.children;
  }
  const message = Object.values(root.constraints)[0];
  return `${message}${
    root.value
      ? ` (value: ${JSON.stringify(root.value)}, type: ${typeof root.value})`
      : ''
  }`;
};

// Re-format error response of class-validator to fit Google JSON style
@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: ValidationError, host: ArgumentsHost) {
    this.logger.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    return response
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .send(NormalException.VALIDATION_ERROR(getErrorMsg(exception)).toJSON());
  }
}
