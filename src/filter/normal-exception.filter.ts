import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { NormalException } from '@/exception/normal.exception';

@Catch(NormalException)
export class NormalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(NormalExceptionFilter.name);

  catch(exception: NormalException, host: ArgumentsHost) {
    this.logger.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(400).send(exception.toJSON()); // Bad Request
  }
}
