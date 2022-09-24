import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpFailResponse } from '@share/interfaces';

interface NormalExceptionReponse {
  message: string;
  code: number;
}

export class NormalException extends HttpException {
  constructor(message: string, code: number) {
    super({ message, code }, HttpStatus.BAD_REQUEST);
  }

  static REQUEST_BODY_CANNOT_PARSE = () => {
    return new NormalException('Request Body Cannot Parse', 10001);
  };

  static HTTP_REQUEST_TIMEOUT = () => {
    return new NormalException('HTTP Request Timeout', 10002);
  };

  static VALIDATION_ISSUE = (msg?: string) => {
    return new NormalException(msg || 'Validation Issue', 10003);
  };

  static FRAMEWORK_ISSUE = (msg?: string) => {
    return new NormalException(msg || 'Framework Issue', 10004);
  };

  static UNEXPECTED = (msg?: string) => {
    return new NormalException(msg || 'Unexpected Error', 10005);
  };

  toJSON(): HttpFailResponse {
    const response = <NormalExceptionReponse>this.getResponse();
    return {
      error: {
        message: response.message,
        code: response.code,
      },
    };
  }

  // @Override
  getResponse(): NormalExceptionReponse {
    return <NormalExceptionReponse>super.getResponse();
  }
}
