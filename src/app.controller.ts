import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from '@/app.service';
import { Controller, Get } from '@nestjs/common';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description: 'Get the app version',
    summary: AppController.prototype.getVersion.name,
  })
  @Get('version')
  getVersion() {
    return this.appService.getVersion();
  }

  @ApiOperation({
    description: 'For metrics server health checking',
    summary: AppController.prototype.healthz.name,
  })
  @Get('healthz')
  healthz() {
    return this.appService.healthz();
  }
}
