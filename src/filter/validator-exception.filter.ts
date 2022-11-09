import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { NormalException } from '@/exception/normal.exception';
import { ValidationError } from 'class-validator';

// Re-format error response of class-validator to fit Google JSON style
@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: ValidationError, host: ArgumentsHost) {
    this.logger.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    const errorMsg = exception.constraints
      ? exception.constraints
      : exception.children[0].constraints;

    response
      .status(422)
      .send(
        NormalException.VALIDATION_ERROR(Object.values(errorMsg)[0]).toJSON()
      ); // Unprocessable Entity
  }
}
