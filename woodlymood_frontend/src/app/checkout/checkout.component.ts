import { Component, OnInit } from '@angular/core';
import { Cart } from '../model/cart';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { Order } from '../model/ordre';
import { Product1 } from '../model/Product1';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(private productservice: ProductService,private authService: AuthService,private http: HttpClient,private router: Router) { }
  responseMessage: string="";
  user={} as User;
  cart={} as Cart;
  ordre={} as Order;
  products: Product1[]= [];
  userId:string ="";
  total: any;
  livraison:string ="";
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
  
      getProducts(){
        this.productservice.getProducts()
          .subscribe(
            res => this.products = res,
          )
      }
  
  ngOnInit(): void {
    this.getUser();
    this.getProducts();
    
    
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

create(): void {
  this.ordre.livraison=this.livraison;
  this.ordre.userId=this.user._id;
  this.ordre.total=this.total;
  this.ordre.status=1;
  this.ordre.products=this.cart.items;
 //this.productservice.deleteCart(this.user._id)
 console.log(this.ordre);
  this.productservice.createOrdre(this.ordre).subscribe(
    res => {
      console.log(res);
    },
    err => console.log(err)
  );
  this.productservice.deleteCart(this.user._id).subscribe(
    res => {
      console.log(res);
    },
    err => console.log(err)
  );
  for(let i=0;i<this.cart.items.length;i++){
  const existingItem = this.products.find(item => item._id.toString() === this.cart.items[i].productId._id.toString());
  console.log( "qqqqqqqqqqqqqqqq",this.cart.items[i].productId._id.toString());
   if(existingItem){console.log("ccccccccc");
   existingItem.quantity -= this.cart.items[i].quantity;
   this.productservice.updateProductquantity(existingItem._id,existingItem.quantity)
   .subscribe(
     res => {
       console.log(res);
     },
     err => console.log(err)
   )
   //this.
   }
  }

console.log(this.user);
  this.authService.updateUser(this.user._id,this.user.nom,this.user.prenom,this.user.numtel, this.user.email, this.user.addresse,this.user.ville,this.user.codepostale).subscribe(
    res => {localStorage.setItem('email',this.user.email );
      console.log(res);
    },
    err => console.log(err)
  );
if(this.user.ville!==""&&this.user.addresse!==""&&this.user.codepostale!==""&&this.user.email!==""&&this.livraison!==""){
  const nom=this.user.nom;
  const prenom=this.user.prenom;
  const total=this.total;
  const email=this.user.email;
  const adresse=this.user.addresse;
  const ville=this.user.ville;
  const codepostale=this.user.codepostale;
  this.http.post('http://localhost:3000/send-email/checkout', { nom,prenom,total,email,adresse,ville,codepostale})
  .subscribe(
    response => {
      this.responseMessage = 'Email envoyer avec succés ';console.log(this.responseMessage);this.router.navigate(['/']);
    },
    error => {
      this.responseMessage = 'Email pas envoyer.';console.log(this.responseMessage);
    }
  );}
  else{
  alert("remplir votre formulaire correctement !!!!!");}
}

}
