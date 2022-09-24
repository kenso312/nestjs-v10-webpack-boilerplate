import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getVersion() {
    return process.env.npm_package_version;
  }

  public healthz() {
    return 'OK';
  }
}
