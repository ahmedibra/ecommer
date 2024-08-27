import { Component, OnInit } from '@angular/core';
import { Cart } from '../model/cart';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
 
  constructor(private productservice: ProductService,private authService: AuthService,private router: Router) { }
  user={} as User;
  cart={} as Cart;
  userId:string ="";
  total: any;
  email=this.authService.getEmail();
  getUser(){
    this.authService.getUser(this.email)
    .subscribe({
      next: data => {
        
        this.user=data;
        this.productservice.getCart(this.user._id).subscribe(data => {
          console.log(data);
          this.cart = data;
          this.totall();
        });
        //console.log( this.user);
      }});
      }
  
  
  ngOnInit(): void {
    this.getUser();
    
    
  }

  
totall()  {
  this.productservice.getTotal(this.user._id).subscribe(data => {
    console.log(data);
    this.total = data;
  });
}
deleteProduct(productId:string): void {
  this.productservice.delete(this.user._id,productId)
    .subscribe(
      res => {
        console.log(res);
        this.getUser();
      },
      err => console.log(err)
    )
}
commander(){
  if(this.total==0){
  alert("le panier est vide !!!!!");}
  else {this.router.navigate(['/checkout']);}
}

}
