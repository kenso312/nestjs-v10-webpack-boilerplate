import { AppModule, VersionRes } from '@mod/app';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { initialize } from '@util/helper';
import { wrapDataObj } from './common';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  const { BASE_PATH, npm_package_version } = process.env;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );

    initialize(app);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  const versionPath = `${BASE_PATH}/version`;
  it(`${versionPath} (GET)`, async () => {
    const result: VersionRes = { version: npm_package_version };

    const response = await app.inject({
      url: versionPath,
    });
    expect(response.statusCode).toEqual(200);
    expect(response.json()).toEqual(wrapDataObj(result));
  });

  const healthPath = `${BASE_PATH}/healthz`;
  it(`${healthPath} (GET)`, async () => {
    const response = await app.inject({
      url: healthPath,
    });
    expect(response.statusCode).toEqual(200);
    expect(response.json()).toEqual(wrapDataObj('OK'));
  });

  afterAll(async () => {
    await app.close();
  });
});
