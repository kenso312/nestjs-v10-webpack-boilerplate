// import { CreateTempleteDto, UpdateTempleteDto } from './dto/_index';
// import { I18nRequestScopeService } from 'nestjs-i18n';
// import { Injectable } from '@nestjs/common';
// import { TempleteEntity } from '@entity/_templete.entity';
// import { TempleteRepository } from '@repo/_templete.repository';

// @Injectable()
// export class TempleteService {
//   constructor(
//     private readonly i18n: I18nRequestScopeService,
//     private readonly templeteRepo: TempleteRepository
//   ) {}

//   async create(data: CreateTempleteDto): Promise<TempleteEntity> {
//     const record = this.templeteRepo.create(data);
//     return this.templeteRepo.save(record);
//   }

//   async findAll(): Promise<TempleteEntity[]> {
//     return this.templeteRepo.find();
//   }

//   async findOne(id: number): Promise<TempleteEntity> {
//     return this.templeteRepo.findOneOrFail(id);
//   }

//   async update(id: number, data: UpdateTempleteDto): Promise<boolean> {
//     return (await this.templeteRepo.update(id, data)).affected > 0;
//   }

//   async remove(id: number): Promise<boolean> {
//     return (await this.templeteRepo.delete(id)).affected > 0;
//   }
// }
