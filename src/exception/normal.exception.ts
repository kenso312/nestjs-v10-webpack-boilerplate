import { FailResponse, HttpFailResponse } from '@share/interfaces';
import { HttpException, HttpStatus } from '@nestjs/common';

export class NormalException extends HttpException {
  constructor(message: string, code: number) {
    super({ message, code }, HttpStatus.BAD_REQUEST);
  }

  static HTTP_REQUEST_TIMEOUT = () => {
    return new NormalException('HTTP Request Timeout', 10001);
  };

  static VALIDATION_ERROR = (msg?: string) => {
    return new NormalException(msg || 'Validation Error', 10002);
  };

  static UNEXPECTED = (msg?: string) => {
    return new NormalException(msg || 'Unexpected Error', 10003);
  };

  toJSON(): HttpFailResponse {
    const response = <FailResponse>this.getResponse();
    return {
      error: {
        message: response.message,
        code: response.code,
      },
    };
  }

  // @Override
  getResponse(): FailResponse {
    return <FailResponse>super.getResponse();
  }
}
