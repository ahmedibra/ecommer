import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CategoryHerosModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import * as Joi from 'joi';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmailModule } from './email/email.module'; 
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        FRONTEND_URL: Joi.string(),
        // ...
      }),
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),

    AuthModule,
    ProductModule,
    CategoryHerosModule,
    CartModule,EmailModule,CheckoutModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
