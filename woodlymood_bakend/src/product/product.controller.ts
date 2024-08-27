import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from "./product.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDTO } from "./dto/product.dto";
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }
    @Post('/create')
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = Date.now() + extname(file.originalname);
          callback(null, filename);
        },
      }),
    }))
    async createProduct(@Res() res,@Body() createProductDTO:CreateProductDTO ,@UploadedFile() file: Express.Multer.File) {
        createProductDTO.imageURL=file.filename;
        
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product Successfully Created',
            product
        });
    }
  

   // Add Product: /product/create
  /* @Post('/create')
   async createProduct(@Res() res) {
       const name ="fbgf";
       const description = "gbh";
       const price = 15;
       const category = "fbfg";
       const imageURL="cfffff";
       const data: CreateProductDTO = {
           name,description,price,category,imageURL};
         return this.productService.createProduct(data);
   }*/


    // Get Products /product
    // @Get('/list')
    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json(products);
    }

    // GET single product: /product/5c9d46100e2e5c44c444b2d1
    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID) {
        const product = await this.productService.getProduct(productID);
        
        return res.status(HttpStatus.OK).json(product);
    }

    // GET single product: /product/5c9d46100e2e5c44c444b2d1
    @Get('/category/:id')
    async getProductsByCategory(@Res() res, @Param('id') id:string) {
        const product = await this.productService.getProductsByCategory(id);
        console.log(product);
        if (!product) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json(product);
    }

    // Delete Product: /delete?productID=5c9d45e705ea4843c8d0e8f7
    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID) {
        const productDeleted = await this.productService.deleteProduct(productID);
        if (!productDeleted) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Successfully',
            productDeleted
        });
    }
  @Put('/update-quantities')
  async updateAllQuantities(@Body() body: { id: string, quantity: number}) {
    return this.productService.updateAllQuantities(body.id, body.quantity);
  }

    // Update Product: /update?productID=5c9d45e705ea4843c8d0e8f7
    @Put('/update')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const filename = Date.now() + extname(file.originalname);
            callback(null, filename);
          },
        }),
      }))
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO,@UploadedFile() file: Express.Multer.File, @Query('productID') productID) {
        createProductDTO.imageURL=file.filename;
        const updatedProduct = await this.productService.updateProduct(productID, createProductDTO);
        if (!updatedProduct) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Updated Successfully',
            updatedProduct 
        });
    }

   


    

}
