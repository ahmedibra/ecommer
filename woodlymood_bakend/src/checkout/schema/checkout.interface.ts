import { Document } from 'mongoose';
import { Product } from 'src/product/interfaces/product.interface'; 

export interface Ordre extends Document {
    userId: string;
    total: Number;
    livraison: string;
    status: number;
    products: { productId: string; quantity: number }[];

}

