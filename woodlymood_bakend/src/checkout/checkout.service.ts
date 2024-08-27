import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ordre } from './schema/checkout.interface';
import { CheckoutController } from './checkout.controller';
import { CreateOrderDto } from './schema/createOrdreDtto';
@Injectable()
export class CheckoutService {
  constructor(
    @InjectModel('ckeckout') private readonly checkoutModel: Model<Ordre>,
    
  ) {}

  async getAll(): Promise<Ordre[]> {
    return this.checkoutModel.find().populate('products.productId').exec();
}

async create(createOrderDto: CreateOrderDto) {
    const order = new this.checkoutModel(createOrderDto);
    return order.save();
}

}



