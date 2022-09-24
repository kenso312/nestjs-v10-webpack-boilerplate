import { Injectable } from '@nestjs/common';
import { VersionRes } from './dto';

@Injectable()
export class AppService {
  public getVersion(): VersionRes {
    return { version: process.env.npm_package_version };
  }

  public healthz(): string {
    return 'OK';
  }
}
