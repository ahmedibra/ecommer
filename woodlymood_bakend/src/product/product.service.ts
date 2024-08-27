import { Injectable ,NotFoundException} from '@nestjs/common';

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { Product } from './interfaces/product.interface';
import { Category } from 'src/category/schema/category';
import { CreateProductDTO } from "./dto/product.dto";
import { CategoryService } from 'src/category/category.service';
@Injectable()
export class ProductService {

    constructor(@InjectModel('Product')private readonly  productModel: Model<Product>,
    private categoryService: CategoryService) {}

    async getProducts(): Promise<Product[]> {
        return this.productModel.find().populate('category').exec();
      }
    
      async getProduct(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).populate('category').exec();
        if (!product) {
          throw new NotFoundException('Product not found');
        }
        return product;
      }


    // Post a single product
    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const name=createProductDTO.name;
    const description=createProductDTO.description;
    const imageURL=createProductDTO.imageURL;
    const price=createProductDTO.price;
    const categoryId=createProductDTO.category;
    const quantity=Number(createProductDTO.quantity);
    const promotion= createProductDTO.promotion;
    const category = await this.categoryService.getById(categoryId);
  

    const product = new this.productModel({ name,description,imageURL,price,promotion,quantity, category });
    
    return product.save();
        
    }

    async getProductsByCategory(id: string): Promise<Product[]> {
        return this.categoryService.getById(id).then(category=> {
            if (!category) {
                throw new Error('Category not found');
            }
            console.log("fdfsfqdgg",category);
            return this.productModel.find({category:category._id}).populate('category').exec();
        });
    }

    // Delete Product
    async deleteProduct(productID: string): Promise<any> {
        const deletedProduct = await this.productModel.findByIdAndDelete(productID).populate('category').exec();
    }

    // Put a single product
    async updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Product> {
    const name=createProductDTO.name;
    const description=createProductDTO.description;
    const imageURL=createProductDTO.imageURL;
    const price=createProductDTO.price;
    const categoryId=createProductDTO.category;
    const quantity=Number(createProductDTO.quantity);
    const promotion= createProductDTO.promotion;

    const category = await this.categoryService.getById(categoryId);
    

        const updatedProduct = await this.productModel
                            .findByIdAndUpdate(productID, { name,description,imageURL,price,promotion,quantity, category }, {new: true});
        return updatedProduct;
    }

    async searchProducts(query: string): Promise<Product[]> {
        return this.productModel.find({
          $text: { $search: query },
        }).exec();
      }

      async updateAllQuantities(id:string,quantity1:number): Promise<any> {
       const quantity =quantity1;
        return this.productModel.findByIdAndUpdate(id,  { quantity });
      }

}
