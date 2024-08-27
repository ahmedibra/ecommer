import { Controller, Post, Get, Body, Param ,Logger,Delete} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  async addItem(@Body() body: { userId: string, productId: string, quantity: number }) {

    return this.cartService.addItem(body.userId, body.productId, body.quantity);
  }

  @Get('/:userId')
  async getCart(@Param('userId') userId: string) {
  
    return await this.cartService.getCart(userId);
  }

  @Get('/total/:userId')
  async getTotal(@Param('userId') userId: string) {
  
    return await this.cartService.getTotal(userId);
  }


  @Post('/delete')
  async delete(@Body() body: { userId: string, productId: string}) {
     return  await this.cartService.delete(body.userId,body.productId);
  }

  @Post('/delete2/:userId')
  async delete2(@Param('userId') userId: string) {
     return  await this.cartService.delete2(userId);
  }

}

