import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';
import { NormalException } from '@/exception/normal.exception';
import { VersionRes } from './dto';
import { toSwaggerError } from '@util/helper';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description: 'Get the app version',
    summary: AppController.prototype.getVersion.name,
  })
  @ApiOkResponse({
    description: 'Return current version',
    type: VersionRes,
  })
  @ApiBadRequestResponse(toSwaggerError(NormalException.UNEXPECTED()))
  @Get('version')
  getVersion(): VersionRes {
    return this.appService.getVersion();
  }

  @ApiOperation({
    description: 'For metrics server health checking',
    summary: AppController.prototype.healthz.name,
  })
  @ApiOkResponse({
    description: 'Return OK',
    // Because only return string here, no schema, so write the example directly
    content: {
      'application/json': {
        example: {
          data: 'OK',
        },
      },
    },
  })
  @Get(AppController.prototype.healthz.name)
  healthz(): string {
    return this.appService.healthz();
  }
}
