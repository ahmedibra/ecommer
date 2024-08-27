// src/orders/dto/create-order.dto.ts

import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string; // L'identifiant de l'utilisateur qui passe la commande

  @IsArray()
  @IsNotEmpty()
  readonly products: ProductOrderDto[]; // Une liste des produits commandés

  @IsNumber()
  readonly total: number; // Le montant total de la commande

  @IsString()
  readonly livraison: string;

  @IsNumber()
  readonly status: number;
}

// Un DTO pour chaque produit dans la commande
class ProductOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly productId: string; // L'identifiant du produit

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number; // La quantité de ce produit dans la commande
}

