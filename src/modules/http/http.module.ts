import { Module } from '@nestjs/common';

import { HttpService } from './http.service';

@Module({
  exports: [HttpService],
  providers: [HttpService],
})
export class HttpModule {}
