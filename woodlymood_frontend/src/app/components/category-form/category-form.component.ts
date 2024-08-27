import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  category={} as Category;
  selectedFile: File |null = null;
  edit: boolean = false;

 
  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  ngOnInit() {
    const params = this.activatedRoute.snapshot.params['id'];
    if (params) {
      this.productService.getCategory(params)
        .subscribe(
          res => {
            console.log(res);
            this.category = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  submitCategory() {
    this.category.image="/image";
    const formData = new FormData();
    formData.append('name', this.category.name);
    formData.append('title', this.category.title);
    formData.append('image', this.category.image);
    
    if(this.selectedFile){
    formData.append('file', this.selectedFile);}
    this.productService.createCategory(formData).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/category']);
        },
        err => console.log(err)
      )
  }

  updateCategory() {
    this.category.image="/image";
    const formData = new FormData();
    formData.append('name', this.category.name);
    formData.append('title', this.category.title);
    formData.append('image', this.category.image);
    
    if(this.selectedFile){
    formData.append('file', this.selectedFile);}
   
    this.productService.updateCategory(this.category._id, formData)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/category'])
        },
        err => console.log(err)
      )
  }

}
