import { Document } from 'mongoose';
import { Product } from 'src/product/interfaces/product.interface'; 

export interface CartItem {
    productId: string;  // or `number`, depending on your data type
    quantity: number;
}

export interface Cart extends Document {
    userId: string;
    items: { productId: string; quantity: number }[];
}
