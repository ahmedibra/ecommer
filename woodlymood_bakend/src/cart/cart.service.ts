import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './schema/cart.interface'; 
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<Cart>,
    private readonly productService: ProductService
  ) {}

  async addItem(userId: string, productId: string, quantity: number): Promise<Cart> {
    const cart = await this.cartModel.findOne( {userId }).exec();
    
    const product = await this.productService.getProduct(productId);
    
    //console.log('Cart Items:', cart.items);
    if (!product) {
      throw new Error('Product not found');
    }
    if (cart) {console.log(cart.userId);console.log("aaaaaaa");
      const existingItem = cart.items.find(item => item.productId.toString() === productId);
     console.log( existingItem);
      if(existingItem){console.log("ccccccccc");
      existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      return cart.save();
    } else {
      const newCart = new this.cartModel({ userId, items: [{ productId, quantity }] });console.log("bbbbbbbbb");
      return newCart.save();
    }
  }

  async getCart(userId: string): Promise<Cart> {
    return this.cartModel.findOne({ userId }).populate('items.productId').exec();
  }


  async getTotal(userId: string): Promise<any> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      return 0;
    }

    const itemsWithPrice = await Promise.all(
      cart.items.map(async (item) => {
        const product = await this.productService.getProduct(item.productId);
        return {
          item,
          price: Number(product.promotion)>0 ? product.promotion : Number(product.price)
        };
      })
    );

    const totalPrice = itemsWithPrice.reduce((total, item) => total + Number(item.price) * Number(item.item.quantity), 0);
console.log(totalPrice);
    return totalPrice;
   
  }


  async delete(userId: string, productId: string) : Promise<Cart> {
    const cart = await this.cartModel.findOne( {userId }).exec();
    
    if (cart) {console.log(cart.userId);console.log("aaaaaaa");
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        return cart.save();
      }
      return null;
}

async delete2(userId: string) : Promise<Cart> {
  const cart = await this.cartModel.findOne( {userId }).exec();
  
  if (cart) {console.log(cart.userId);console.log("aaaaaaa");
    cart.items = [];
      return cart.save();
    }
    return null;
}
}



