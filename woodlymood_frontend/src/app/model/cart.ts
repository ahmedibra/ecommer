import { Product1 } from "./Product1";

export interface Cart {
    userId: string,
    items: CartItem[]
  }
  
  export interface CartItem {
    productId: Product1,
    quantity: number
  }