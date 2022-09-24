import { ApiResponseProperty } from '@nestjs/swagger';

export class NormalError {
  @ApiResponseProperty({
    example: 'Request Body Cannot Parse',
  })
  message: string;

  @ApiResponseProperty({
    example: 10001,
  })
  code: number;
}
