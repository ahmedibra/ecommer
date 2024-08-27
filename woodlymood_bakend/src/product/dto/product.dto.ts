import {
    
    IsNotEmpty,
    IsString,
    IsNumber
  } from 'class-validator';
import { Category } from 'src/category/schema/category';

  export class CreateProductDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsString()
    readonly description: string;
    @IsNotEmpty()
    @IsString()
    imageURL: string;
    @IsString()
    price: string;
    promotion: string;
    @IsNotEmpty()
    quantity: string;
    @IsNotEmpty()
    @IsString()
    category: string;
}




