import { Component, OnInit } from '@angular/core';
import { Product1 } from 'src/app/model/Product1';
import { Category } from 'src/app/model/Category';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product={} as Product1;
  categories: Category[]= [];
  
  edit: boolean = false;
  selectedFile: File |null = null;
 
  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  ngOnInit() {
    this.getCategories();
    const params = this.activatedRoute.snapshot.params['id'];
    if (params) {
      this.productService.getProduct(params)
        .subscribe(
          res => {
            console.log(res);
            this.product = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  submitProduct() {
    console.log("ggggrhtrhggggg"+this.product.name, this.product.description,this.product.price, this.product.category);
    this.product.imageURL="/image";
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    formData.append('promotion', this.product.promotion.toString());
    formData.append('quantity', this.product.quantity.toString());
    formData.append('category', this.product.category.toString());
    formData.append('imageURL', this.product.imageURL);
    
    if(this.selectedFile){
    formData.append('file', this.selectedFile);}
    this.productService.createProduct(formData)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/product']);
        },
        err => console.log(err)
      )
  }

  updateProduct() {
    this.product.imageURL="/image";
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    formData.append('promotion', this.product.promotion.toString());
    formData.append('quantity', this.product.quantity.toString());
    formData.append('category', this.product.category.toString());
    formData.append('imageURL', this.product.imageURL);
    if(this.selectedFile){
      formData.append('file', this.selectedFile);}
    this.productService.updateProduct(this.product._id, formData)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/product'])
        },
        err => console.log(err)
      )
  }

  getCategories(): void {
    this.productService.getCategories()
      .subscribe(
        res => this.categories = res,
        err => console.log(err)
      )
  }

}
