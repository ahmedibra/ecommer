import { Controller, Post, Get, Body, Param ,Logger,Delete} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { Ordre } from './schema/checkout.interface';
import { CreateOrderDto } from './schema/createOrdreDtto';
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Ordre> {
    return this.checkoutService.create(createOrderDto);
  }

  @Get()
  async findAll(): Promise<Ordre[]> {
    return this.checkoutService.getAll();
  }
}

