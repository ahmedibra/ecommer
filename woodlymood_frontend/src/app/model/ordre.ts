import { Product1 } from "./Product1";

export interface Order {
    addresse: string;
    ville: string;
    codepostale: string;
    nom: string;
    prenom: string;
    numtel: string;
    email :string;
    userId: string;
    products: CartItem[];
    total: number;
    livraison: string;
    status: number;
  }

  export interface CartItem {
    productId: Product1,
    quantity: number
  }

