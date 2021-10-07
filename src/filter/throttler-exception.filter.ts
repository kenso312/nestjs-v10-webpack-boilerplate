import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { HttpFailResponse } from './all-exception.filter';
import { ThrottlerException } from '@nestjs/throttler';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
  catch(_exception: ThrottlerException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<FastifyReply>();
    const data: HttpFailResponse = {
      error: {
        message: 'Too many Requests',
        code: 20001,
      },
    };
    response.status(429).send(data); // Too Many Requests
  }
}
