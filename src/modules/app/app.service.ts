import * as packageJSON from '@/../package.json';
import { Injectable } from '@nestjs/common';

import type { VersionRes } from './dto';

@Injectable()
export class AppService {
  public getVersion(): VersionRes {
    return { version: packageJSON.version };
  }

  public healthz(): string {
    return 'OK';
  }
}
