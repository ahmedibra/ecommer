import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schema/category';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('category')
export class CategoryController {
    constructor(private superHeroServices: CategoryService) { }

    @Get()
    async getAll() {
        return await this.superHeroServices.getAll()
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const filename = Date.now() + extname(file.originalname);
            callback(null, filename);
          },
        }),
      }))
    async createCategory(@Body() superHeros: Category,@UploadedFile() file: Express.Multer.File) {
        superHeros.image=file.filename;
        return await this.superHeroServices.create(superHeros)
    }

    @Get('/:id')
    async getById(@Param('id') id: string) {
        return await this.superHeroServices.getById(id)
    }

    @Put('/:id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const filename = Date.now() + extname(file.originalname);
            callback(null, filename);
          },
        }),
      }))
    async update(@Param('id') id: string, @Body() superHeroes: Category,@UploadedFile() file: Express.Multer.File) {
        superHeroes.image=file.filename;
        return await this.superHeroServices.update(id, superHeroes)
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        await this.superHeroServices.delete(id)
    }

}
