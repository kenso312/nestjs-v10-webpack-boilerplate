// import { CreateTemplateDto, UpdateTemplateDto } from './dto/_index';
// import { I18nRequestScopeService } from 'nestjs-i18n';
// import { Injectable } from '@nestjs/common';
// import { TemplateEntity } from '@/database/entities/_template.entity';
// import { TemplateRepository } from '@repo/_template.repository';

// @Injectable()
// export class TemplateService {
//   constructor(
//     private readonly i18n: I18nRequestScopeService,
//     private readonly templateRepo: TemplateRepository
//   ) {}

//   async create(data: CreateTemplateDto): Promise<TemplateEntity> {
//     const record = this.templateRepo.create(data);
//     return this.templateRepo.save(record);
//   }

//   async findAll(): Promise<TemplateEntity[]> {
//     return this.templateRepo.find();
//   }

//   async findOne(id: number): Promise<TemplateEntity> {
//     return this.templateRepo.findOneOrFail(id);
//   }

//   async update(id: number, data: UpdateTemplateDto): Promise<boolean> {
//     return (await this.templateRepo.update(id, data)).affected > 0;
//   }

//   async remove(id: number): Promise<boolean> {
//     return (await this.templateRepo.delete(id)).affected > 0;
//   }
// }
