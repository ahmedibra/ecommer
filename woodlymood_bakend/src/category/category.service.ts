import { Injectable } from '@nestjs/common';
import { Category, superHeroDocument } from './schema/category';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class CategoryService {

    constructor(
        @InjectModel(Category.name)
        private categoryModel: Model<superHeroDocument>
    ) { }

    async getAll(): Promise<Category[]> {
        return this.categoryModel.find().exec();
    }

    async create(superHeroes: Category) {
        const name=superHeroes.name;
        const newSuperHeroes = new this.categoryModel(superHeroes);
        return newSuperHeroes.save();
    }

    async getById(id: string): Promise<Category> {
        return this.categoryModel.findById(id).exec();
    }

    async update(id: string, superHeroes: Category) {
        return await this.categoryModel.findByIdAndUpdate(id, superHeroes, { new: true });
    }

    async delete(id: string) {
        await this.categoryModel.findByIdAndDelete(id);
    }
}

