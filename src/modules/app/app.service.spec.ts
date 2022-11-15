import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';
import { VersionRes } from './dto';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getVersion()', () => {
    it('should return version number', async () => {
      const result: VersionRes = {
        version: process.env.npm_package_version,
      };
      expect(service.getVersion()).toEqual(result);
    });
  });

  describe('healthz()', () => {
    it('should return health status', async () => {
      expect(service.healthz()).toEqual('OK');
    });
  });
});
