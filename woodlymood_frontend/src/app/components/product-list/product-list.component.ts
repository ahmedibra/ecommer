import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product1 } from 'src/app/model/Product1';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: Product1[]= [];
  cat:any;
  p: number = 1; // Page number
  itemsPerPage: number = 30; // Items per page

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(
        res => this.products = res,
        err => console.log(err)
      )
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id)
      .subscribe(
        res => {
          console.log(res);
          this.getProducts();
        },
        err => console.log(err)
      )
  }

}
