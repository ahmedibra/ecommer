import { Component, OnInit } from '@angular/core';
import { Product1 } from 'src/app/model/Product1';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';


import { Cart } from '../model/cart';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  product={} as Product1;
  edit: boolean = false;
 
  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }
  user={} as User;
  cart={} as Cart;
  userId:string ="";
  email=this.authService.getEmail();
  getUser(){
    this.authService.getUser(this.email)
    .subscribe({
      next: data => {
        
        this.user=data;
        console.log("user   ",this.user);
        this.productService.getCart(this.user._id).subscribe(data => {
          console.log("sdsfddsff",data);
          this.cart = data;
        });
        console.log( this.user._id);}});
      }
  
  
  ngOnInit() {
    
    this.getUser();
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



 addToCart(quantity1:number,productId: string, quantity: number) {
    console.log("k,ncdk,nvkle,vklef,");
    console.log(this.user._id,quantity1,productId,quantity,this.email);
    this.userId=this.user._id;    
    if(!this.userId){ this.router.navigateByUrl('/sign-in');}
    if(quantity1<=0){ alert("Ce produit est en repture se stock");}
    console.log("cart",this.cart);
    if(this.cart!=null){
    const existingItem = this.cart.items.find(item => item.productId._id === productId);
    console.log("aaaaaaaaaaaaaaaaaaaaa");
    if(existingItem){
    if(existingItem.quantity<quantity1){ console.log("bbbbbbbbbbbbbb");
        this.productService.addItem(this.userId, productId, quantity).subscribe(
        res => {
          
          this.router.navigate(['/cart']);
          console.log(res);
         
         
        },
        err => console.log(err)
      );} else {alert("La quantité n'est pas sufisante");}}
    else  {
           this.productService.addItem(this.userId, productId, quantity).subscribe(
            res => {
              
            this.router.navigate(['/cart']);
              console.log(res);
              
             
            },
            err => console.log(err)
          );
        }}
        else  {
          this.productService.addItem(this.userId, productId, quantity).subscribe(
           res => {
             
           this.router.navigate(['/cart']);
             console.log(res);
             
            
           },
           err => console.log(err)
         );
       }
     
    
       
    }
  }


