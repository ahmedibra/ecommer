import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-product-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private productService: ProductService) { }

  categories: Category[]= [];
 
  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.productService.getCategories()
      .subscribe(
        res => this.categories = res,
        err => console.log(err)
      )
  }
  
  deleteCategory(id: string): void {
    this.productService.deleteCategory(id)
      .subscribe(
        res => {
          console.log(res);
          this.getCategories();
        },
        err => console.log(err)
      )
  }

}
