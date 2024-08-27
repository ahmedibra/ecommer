import { Component, OnInit } from '@angular/core';
  
import { ProductService } from 'src/app/services/product.service';
import { Product1 } from 'src/app/model/Product1';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../model/Category';

@Component({
  selector: 'app-bureau',
  templateUrl: './bureau.component.html',
  styleUrls: ['./bureau.component.scss']
})
export class BureauComponent implements OnInit {


  constructor(private productService: ProductService,private router: Router,
    private activatedRoute: ActivatedRoute) { }
    p: number = 1; // Page number
  itemsPerPage: number = 9; // Items per page

  products: Product1[]= [];
  category={} as Category; 
  backgroundImageUrl: string = '';

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params['id'];
    if (params) {
      this.productService.getProductsByCategory(params)
        .subscribe(
          res => {
            console.log(res);
            this.products = res;
            
          },
          err => console.log(err)
        );
        this.productService.getCategory(params)
        .subscribe(
          res => {
            console.log(res);
            this.category = res;
            this.setBackgroundImage();
            
          },
          err => console.log(err)
        )
    };
    
    }


    setBackgroundImage() {
      if (this.category && this.category.image) {
        this.backgroundImageUrl = `url(http://localhost:3000/uploads/${this.category.image})`;console.log("qdsfsqfgvdsf")
      } else {
        this.backgroundImageUrl = `url(/path/to/default-image.jpg)`; // Fallback image if needed
      }
    }
  

 

}


