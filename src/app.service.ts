import { I18nRequestScopeService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly i18n: I18nRequestScopeService) {}

  async getVersion(): Promise<string> {
    return `${await this.i18n.t('app.version')} ${
      process.env.npm_package_version
    }`;
  }
}
