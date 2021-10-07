import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';

export interface HttpFailResponse {
  error: {
    message: string;
    code: number;
  };
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<FastifyReply>();
    const data: HttpFailResponse = {
      error: {
        message: exception.message,
        code: 20000,
      },
    };
    response.status(400).send(data); // Bad Request
  }
}
