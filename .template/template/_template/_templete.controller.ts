// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
// } from '@nestjs/common';
// import { CreateTempleteDto } from './dto/create-templete.dto';
// import { TempleteService } from './_templete.service';
// import { UpdateTempleteDto } from './dto/update-templete.dto';

// @Controller('_templete')
// export class TempleteController {
//   constructor(private readonly templeteService: TempleteService) {}

//   @Post()
//   async create(@Body() data: CreateTempleteDto) {
//     return this.templeteService.create(data);
//   }

//   @Get()
//   async findAll() {
//     return this.templeteService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     return this.templeteService.findOne(+id);
//   }

//   @Patch(':id')
//   async update(@Param('id') id: string, @Body() data: UpdateTempleteDto) {
//     return this.templeteService.update(+id, data);
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     return this.templeteService.remove(+id);
//   }
// }
