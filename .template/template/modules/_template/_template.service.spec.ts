// import { I18nRequestScopeService } from 'nestjs-i18n';
// import { TemplateRepository } from '@repo/_template.repository';
// import { TemplateService } from './_template.service';
// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';

// describe('TemplateService', () => {
//   let service: TemplateService;
//   let repo: TemplateRepository;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         TemplateService,
//         {
//           provide: I18nRequestScopeService,
//           useValue: {
//             translate: () => '',
//             t: () => '',
//           },
//         },
//         {
//           provide: getRepositoryToken(TemplateRepository),
//           useClass: TemplateRepository,
//         },
//       ],
//     }).compile();

//     service = module.get<TemplateService>(TemplateService);
//     repo = module.get<TemplateRepository>(
//       getRepositoryToken(TemplateRepository)
//     );
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//     expect(repo).toBeDefined();
//   });
// });
