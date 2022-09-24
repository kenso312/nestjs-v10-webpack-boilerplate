import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { NormalException } from '@/exception/normal.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error(exception.stack);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response
      .status(exception?.getStatus?.() || 400)
      .send(NormalException.UNEXPECTED(exception?.message).toJSON());
  }
}
