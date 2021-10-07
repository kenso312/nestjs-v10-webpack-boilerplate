import { AppService } from '@/app.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('version')
  async getVersion() {
    return this.appService.getVersion();
  }

  @Post('test')
  async test(@Body() _body: any) {
    return 'Hello';
  }
}
