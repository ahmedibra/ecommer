import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-sign-up',
  
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  //confpass='';
  fo = {} as User;

  constructor(private auth: AuthService,
    private router: Router) {

     }

     

  ngOnInit(): void {
    //this.fo.role='user';
  }

  register() {
  
    console.log("ggggggggg"+this.fo.name, this.fo.email,this.fo.password);
    this.fo.role="user";
    this.auth.register(this.fo)
    .subscribe({
      next: data => {
        console.log(data);
        this.fo.email='';
        this.fo.name='';
        this.fo.nom='';
        this.fo.numtel='';
        this.fo.password='';
        this.fo.prenom='';

        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
       console.log( this.errorMessage = err.error.message);
        this.isSignUpFailed = true;
      }
    });
  }
  }


