import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('get the app version number', () => {
    it('should return version number', async () => {
      expect(service.getVersion()).toEqual(process.env.npm_package_version);
    });
  });

  describe('get the health status', () => {
    const OK = 'OK';
    it(`should return ${OK}`, async () => {
      expect(service.healthz()).toEqual(OK);
    });
  });
});
