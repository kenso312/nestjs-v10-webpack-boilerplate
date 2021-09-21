import { I18nRequestScopeService } from 'nestjs-i18n';
import { TempleteRepository } from '@repo/_templete.repository';
import { TempleteService } from './_templete.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TempleteService', () => {
  let service: TempleteService;
  let repo: TempleteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TempleteService,
        {
          provide: I18nRequestScopeService,
          useValue: {
            translate: () => '',
            t: () => '',
          },
        },
        {
          provide: getRepositoryToken(TempleteRepository),
          useClass: TempleteRepository,
        },
      ],
    }).compile();

    service = module.get<TempleteService>(TempleteService);
    repo = module.get<TempleteRepository>(
      getRepositoryToken(TempleteRepository)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });
});
