import type {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { FastifyReply } from 'fastify';

import { NormalException } from '@/exception';
import { Catch, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error(exception.stack);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response
      .status(exception?.getStatus?.() || HttpStatus.BAD_REQUEST)
      .send(NormalException.UNEXPECTED(exception?.message).toJSON());
  }
}
