import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ordre } from './schema/checkout.interface';
import { OrderSchema } from './schema/checkout.schema';
import { CheckoutController } from './checkout.controller';
import { ProductModule } from 'src/product/product.module';
import { CheckoutService } from './checkout.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'ckeckout', schema: OrderSchema }]),
        ProductModule
    ],
    providers: [CheckoutService],
    exports: [CheckoutService],
    controllers: [CheckoutController]
})
export class CheckoutModule { }
