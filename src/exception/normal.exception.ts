import type { FailResponse, HttpFailResponse } from '@share/interfaces';

import { HttpException, HttpStatus } from '@nestjs/common';

export class NormalException extends HttpException {
  static HTTP_REQUEST_TIMEOUT = () => {
    return new NormalException('HTTP Request Timeout', 10001);
  };

  static UNEXPECTED = (msg?: string) => {
    return new NormalException(msg || 'Unexpected Error', 10003);
  };

  static VALIDATION_ERROR = (msg?: string) => {
    return new NormalException(msg || 'Validation Error', 10002);
  };

  constructor(message: string, code: number) {
    super({ code, message }, HttpStatus.BAD_REQUEST);
  }

  // @Override
  getResponse(): FailResponse {
    return <FailResponse>super.getResponse();
  }

  toJSON(): HttpFailResponse {
    const response = this.getResponse();
    return {
      error: {
        code: response.code,
        message: response.message,
      },
    };
  }
}
