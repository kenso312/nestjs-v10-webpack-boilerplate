import { ApiResponseProperty } from '@nestjs/swagger';

export class VersionRes {
  @ApiResponseProperty({
    example: 'v1.0.0',
  })
  version: string;
}
