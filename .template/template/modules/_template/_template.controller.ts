// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
// } from '@nestjs/common';
// import { CreateTemplateDto } from './dto/create-template.dto';
// import { TemplateService } from './_template.service';
// import { UpdateTemplateDto } from './dto/update-template.dto';

// @Controller('_template')
// export class TemplateController {
//   constructor(private readonly templateService: TemplateService) {}

//   @Post()
//   async create(@Body() data: CreateTemplateDto) {
//     return this.templateService.create(data);
//   }

//   @Get()
//   async findAll() {
//     return this.templateService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     return this.templateService.findOne(+id);
//   }

//   @Patch(':id')
//   async update(@Param('id') id: string, @Body() data: UpdateTemplateDto) {
//     return this.templateService.update(+id, data);
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     return this.templateService.remove(+id);
//   }
// }
