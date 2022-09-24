import * as request from 'supertest';
import { AppModule } from '@/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/version (GET)', () => {
    return request(app.getHttpServer())
      .get('/version')
      .expect(200)
      .expect({ data: process.env.npm_package_version });
  });

  it('/healthz (GET)', () => {
    return request(app.getHttpServer())
      .get('/healthz')
      .expect(200)
      .expect({ data: 'OK' });
  });
});
