import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { HttpFailResponse } from './all-exception.filter';

interface ValidatorFailResponse {
  statusCode: number;
  message: string[];
  error: string;
}

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const validatorResponse = <ValidatorFailResponse>exception.getResponse();
    const finalResponse: HttpFailResponse = {
      error: {
        code: 20002,
        message: validatorResponse.message[0],
      },
    };
    const response = host.switchToHttp().getResponse<FastifyReply>();
    response.status(422).send(finalResponse); // Unprocessable Entity
  }
}
