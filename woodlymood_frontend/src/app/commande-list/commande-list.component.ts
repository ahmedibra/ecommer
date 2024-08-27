import { Component, OnInit } from '@angular/core';
import { Order } from '../model/ordre';
import { ProductService } from '../services/product.service';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.scss']
})
export class CommandeListComponent implements OnInit {

  constructor(private productservice: ProductService,private authService: AuthService) { }
  ordres:Order[]= [];
  p: number = 1; // Page number
  itemsPerPage: number = 20; // Items per page
  user={} as User;
  email=this.authService.getEmail();
  

  ngOnInit(): void {
    this.productservice.getAllOrdre()
    .subscribe(
       data => {
        
        this.ordres=data;
        for(let i=0;i<this.ordres.length;i++){
        this.authService.getUserById(this.ordres[i].userId).subscribe({
      next: data => {
        
        this.user=data;
        console.log("user"   ,this.user);
        this.ordres[i].addresse=this.user.addresse;
        this.ordres[i].codepostale=this.user.codepostale;
        this.ordres[i].nom=this.user.nom;
        this.ordres[i].prenom=this.user.prenom;
        this.ordres[i].numtel=this.user.numtel;
        this.ordres[i].email=this.user.email;
        this.ordres[i].ville=this.user.ville;
        
        //console.log( this.user);
      }});}
        console.log(this.ordres);
       
        });
        //console.log( this.user);
      }
  }


