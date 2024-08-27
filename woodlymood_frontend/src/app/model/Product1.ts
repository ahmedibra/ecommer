import { Category } from "./Category";

export interface Product1 {
    _id: string,
    name: string,
    description: string,
    imageURL: string,
    price: number,
    promotion: number,
    quantity:number,
    category:Category
    
}