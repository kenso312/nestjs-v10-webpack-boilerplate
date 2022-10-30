import * as request from 'supertest';
import { AppModule } from '@mod/app';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { VersionRes } from '@/modules/app/dto';
import { wrapDataObj } from './common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  const versionPath = '/version';
  it(`${versionPath} (GET)`, () => {
    const result: VersionRes = {
      version: process.env.npm_package_version,
    };

    return request(app.getHttpServer())
      .get(versionPath)
      .expect(200, wrapDataObj(result));
  });

  const healthPath = '/healthz';
  it(`${healthPath} (GET)`, () => {
    return request(app.getHttpServer())
      .get(healthPath)
      .expect(200, wrapDataObj('OK'));
  });

  afterAll(async () => {
    await app.close();
  });
});
