import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart } from './schema/cart.schema';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductModule } from 'src/product/product.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Cart', schema: Cart }]),
        ProductModule
    ],
    providers: [CartService],
    exports: [CartService],
    controllers: [CartController]
})
export class CartModule { }
