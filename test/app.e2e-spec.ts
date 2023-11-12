import type { VersionRes } from '@mod/app';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import type { TestingModule } from '@nestjs/testing';
import type { HttpFailResponse, HttpSuccessResponse } from '@share/interfaces';

import { AppModule } from '@mod/app';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { initialize } from '@util/helper';

import { des } from './common';

describe('AppModule', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());

    initialize(app);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  des({ url: '/version' }, async (config) => {
    it('should return version number with 200 status code', async () => {
      const expectedResult: VersionRes = {
        version: process.env.npm_package_version,
      };
      const response = await app.inject(config);
      const actualResult = response.json<HttpSuccessResponse<VersionRes>>();

      expect(response.statusCode).toEqual(200);
      expect(actualResult.data).toEqual(expectedResult);
    });
  });

  des({ url: '/healthz' }, async (config) => {
    it('should return health status with 200 status code', async () => {
      const expectedResult = 'OK';
      const response = await app.inject(config);
      const actualResult = response.json<HttpSuccessResponse<string>>();

      expect(response.statusCode).toEqual(200);
      expect(actualResult.data).toEqual(expectedResult);
    });
  });

  des({ url: '/n0-th1s-path' }, async (config) => {
    it('should return error object with 404 status code', async () => {
      const response = await app.inject(config);
      const actualResult = response.json<HttpFailResponse>();

      expect(response.statusCode).toEqual(404);
      expect(actualResult.error.code).toEqual(10003);
      expect(actualResult.error.message).toContain(config.url);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
