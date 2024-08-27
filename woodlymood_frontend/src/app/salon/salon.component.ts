import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product1 } from 'src/app/model/Product1';
@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.scss']
})
export class SalonComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: Product1[]= [];
  filtres: Product1[]= [];
  p: number = 1; // Page number
  itemsPerPage: number = 9; // Items per page

  ngOnInit() {
    this.getProducts();
   
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(
        
        res => {this.products = res;this.filtres = this.products.filter(pro => pro.promotion >0);},
       
        
        err => console.log(err)
      ); 
  };
 

}


