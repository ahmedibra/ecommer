import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product1 } from 'src/app/model/Product1';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  products: Product1[]= [];
  searchQuery: string = '';
  filteredProducts :Product1[]= [];

  p: number = 1; // Page number
  itemsPerPage: number = 9; // Items per page
  ngOnInit() {
    this.getProducts();
   

    // Assuming you have a service that handles communication between components
    
        
      
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(
        res => {this.products = res; this.filteredProducts = res; console.log(this.filteredProducts);
          console.log(this.products);
          const params = this.activatedRoute.snapshot.params['query'];
          if (params) {
     
            this.filteredProducts = this.filterProducts(params);
            console.log(this.filteredProducts);
           
    }
      }// Initialize with all products
        
      
      )
  }


 
  filterProducts(query: string) {
    if (!query) return this.products;

    console.log("dfsqdgrhgfjhjdfhj");

    return this.filteredProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }




  

}




