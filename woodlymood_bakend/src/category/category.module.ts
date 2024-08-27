import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, SuperHerosSchema } from './schema/category';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Category.name,
            schema: SuperHerosSchema,
            collection:'super-heros'
        }])
    ],
    providers: [CategoryService],
    exports: [CategoryService],
    controllers: [CategoryController]
})
export class CategoryHerosModule { }
