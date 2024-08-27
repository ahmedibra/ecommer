import { Category } from "./Category";

export interface Product {
    _id: string,
    name: string,
    description: string,
    imageURL: string,
    price: number,
    category:string
    
}