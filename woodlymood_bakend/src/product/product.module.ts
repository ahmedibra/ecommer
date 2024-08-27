import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
// Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { Product1Schema } from './schemas/product.schema';
import { CategoryHerosModule } from 'src/category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Product',
      schema: Product1Schema
  }]),
  CategoryHerosModule
],
  
  providers: [ProductService],
  controllers: [ProductController],
  exports:[ProductService]
})
export class ProductModule { }
